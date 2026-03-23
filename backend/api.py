from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, Request, HTTPException
from pydantic import BaseModel
import psycopg2
import os
import time
from datetime import datetime

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
def startup_db_client():
    conn = get_db_connection()
    cursor = conn.cursor()
    try:
        cursor.execute("""
        CREATE TABLE IF NOT EXISTS page_views_journey (
            id SERIAL PRIMARY KEY,
            ip_address TEXT,
            utm_source TEXT DEFAULT 'Direct / Unknown',
            previous_page TEXT,
            current_page TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
        """)
        # TAMBAHAN: Buat tabel guestbook juga saat startup
        cursor.execute("""
        CREATE TABLE IF NOT EXISTS guestbook (
            id SERIAL PRIMARY KEY,
            name TEXT,
            message TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
        """)
        conn.commit()
        print("Database tables verified/created successfully!")
    except Exception as e:
        print(f"Error creating tables: {e}")
    finally:
        cursor.close()
        conn.close()

def get_db_connection():
    retries = 5
    while retries > 0:
        try:
            conn = psycopg2.connect(
                host=os.getenv("DB_HOST", "db"),
                database=os.getenv("DB_NAME", "portfolio"),
                user=os.getenv("DB_USER", "postgres"),
                password=os.getenv("DB_PASSWORD", "postgres")
            )
            return conn
        except psycopg2.OperationalError as e:
            print(f"Database not ready yet, retrying in 3 seconds... ({retries} attempts left)")
            time.sleep(3)
            retries -= 1
    raise Exception("Could not connect to database after multiple retries")

# MODEL
class Guestbook(BaseModel):
    name: str | None = "Anonymous"
    message: str

class TrackData(BaseModel):
    utm_source: str | None = "Direct / Unknown"
    current_page: str
    previous_page: str | None = None

# ENDPOINT
@app.get("/")
def root():
    return {"message": "API is running"}

# track page view
@app.post("/track")
def track(request: Request, data: TrackData):
    ip = request.client.host
    source = data.utm_source if data.utm_source else "Direct / Unknown"
    from_p = data.previous_page
    to_p = data.current_page
    
    conn = get_db_connection()
    cursor = conn.cursor()
    try:
        cursor.execute(
            "INSERT INTO page_views_journey (ip_address, utm_source, previous_page, current_page) VALUES (%s, %s, %s, %s)",
            (ip, source, from_p, to_p)
        )
        conn.commit()
    finally:
        cursor.close()
        conn.close()

    return {"status": "tracked"}

# get analytics
@app.get("/analytics")
def get_analytics():
    conn = get_db_connection()
    cursor = conn.cursor()
    
    try:
        # PERBAIKAN: Gunakan page_views_journey, bukan visitors
        cursor.execute("SELECT COUNT(*) FROM page_views_journey")
        total_views = cursor.fetchone()[0]

        cursor.execute("SELECT COUNT(DISTINCT ip_address) FROM page_views_journey")
        unique_visitors = cursor.fetchone()[0]
        
        cursor.execute("SELECT COUNT(DISTINCT ip_address) FROM page_views_journey WHERE created_at >= NOW() - INTERVAL '5 minutes'")
        active_now = cursor.fetchone()[0]

        cursor.execute("SELECT utm_source, COUNT(*) FROM page_views_journey GROUP BY utm_source")
        utm_rows = cursor.fetchall()
        utm_stats = [{"source": r[0], "pct": round((r[1] / total_views) * 100)} for r in utm_rows] if total_views > 0 else []

        cursor.execute(
            "SELECT previous_page, current_page, COUNT(*) FROM page_views_journey WHERE previous_page IS NOT NULL GROUP BY previous_page, current_page"
        )
        sankey_rows = cursor.fetchall()
        
        page_flows = []
        for row in sankey_rows:
            page_flows.append([row[0], row[1], row[2]])

        return {
            "total_views": total_views,
            "unique_visitors": unique_visitors,
            "active_now": active_now,
            "utm_stats": utm_stats,
            "page_flows": page_flows
        }
    finally:
        cursor.close()
        conn.close()

# guestbook submit
@app.post("/guestbook")
def add_guestbook(data: Guestbook):
    conn = get_db_connection()
    cursor = conn.cursor()
    
    try:
        cursor.execute(
            "INSERT INTO guestbook (name, message) VALUES (%s, %s)",
            (data.name, data.message)
        )
        conn.commit()
        return {"status": "added"}
    except Exception as e:
        conn.rollback()
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        cursor.close()
        conn.close()

# guestbook list
@app.get("/guestbook")
def get_guestbook():
    conn = get_db_connection()
    cursor = conn.cursor()
    
    try:
        cursor.execute(
            "SELECT name, message, created_at FROM guestbook ORDER BY created_at DESC LIMIT 10"
        )
        rows = cursor.fetchall()

        return [
            {"name": r[0], "message": r[1], "time": r[2].isoformat()}
            for r in rows
        ]
    finally:
        cursor.close()
        conn.close()