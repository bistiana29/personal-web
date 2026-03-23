SET timezone TO 'Asia/Jakarta';

CREATE TABLE IF NOT EXISTS visitors (
    id SERIAL PRIMARY KEY,
    ip_address TEXT,
    utm_source TEXT DEFAULT 'Direct / Unknown',
    previous_page TEXT,
    current_page TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS guestbook (
    id SERIAL PRIMARY KEY,
    name TEXT,
    message TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
); 