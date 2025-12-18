# Multi-stage build: build React client then serve with Flask

# Stage 1: Frontend build
FROM node:18-alpine AS frontend
WORKDIR /client
COPY client/package*.json ./
RUN npm install
COPY client/ .
# Build-time args for API endpoints (optional override)
ARG VITE_API_URL
ARG VITE_SOCKET_URL
ENV VITE_API_URL=${VITE_API_URL}
ENV VITE_SOCKET_URL=${VITE_SOCKET_URL}
RUN npm run build

# Stage 2: Backend + static assets
FROM python:3.10-slim AS backend
WORKDIR /app
ENV PYTHONUNBUFFERED=1
COPY server/requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt
COPY server/ /app/server
# Copy built frontend into Flask static directory
COPY --from=frontend /client/dist /app/server/static
WORKDIR /app/server
ENV PORT=8800
EXPOSE 8800
# Use eventlet for Socket.IO compatibility; bind to $PORT for platforms like Render/Railway
CMD gunicorn -k eventlet -w 1 -b 0.0.0.0:${PORT:-8800} app:app
