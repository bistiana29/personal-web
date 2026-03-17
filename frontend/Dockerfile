# frontend/Dockerfile (Development Version)
FROM node:18-alpine

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy semua file project
COPY . .

# Expose port bawaan Vite
EXPOSE 5173

# Jalankan server development Vite
CMD ["npm", "run", "dev", "--", "--host"]