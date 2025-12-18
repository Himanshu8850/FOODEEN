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
# Copy backend source first
COPY server/ /app/server
# Inline requirements to avoid empty file copy issues, then install
RUN printf '%s\n' \
	'bidict==0.23.1' \
	'click==8.1.7' \
	'colorama==0.4.6' \
	'dnspython==2.6.1' \
	'email-validator==2.2.0' \
	'eventlet==0.37.0' \
	'Flask==2.0.1' \
	'Flask-Cors==3.0.10' \
	'flask-mongoengine==1.0.0' \
	'Flask-SocketIO==5.4.1' \
	'flask-wtf==1.2.1' \
	'geographiclib==2.0' \
	'geopy==2.4.1' \
	'greenlet==3.1.1' \
	'h11==0.14.0' \
	'idna==3.10' \
	'itsdangerous==2.2.0' \
	'jinja2==3.1.4' \
	'MarkupSafe==2.1.5' \
	'matplotlib==3.8.0' \
	'mongoengine==0.29.1' \
	'osmnx==1.9.4' \
	'networkx==3.1' \
	'PyJWT==2.9.0' \
	'pymongo==3.12.0' \
	'python-dotenv==1.0.1' \
	'python-engineio==4.10.1' \
	'python-socketio==5.11.4' \
	'scikit-learn==1.3.2' \
	'joblib==1.3.2' \
	'simple-websocket==1.1.0' \
	'six==1.16.0' \
	'Werkzeug==2.2.2' \
	'wsproto==1.2.0' \
	'wtforms==3.1.2' \
	'gunicorn==21.2.0' \
	> /app/requirements.txt && \
	pip install --no-cache-dir -r /app/requirements.txt
# Copy built frontend into Flask static directory
COPY --from=frontend /client/dist /app/server/static
WORKDIR /app/server
ENV PORT=8800
EXPOSE 8800
# Use eventlet for Socket.IO compatibility; bind to $PORT for platforms like Render/Railway
CMD gunicorn -k eventlet -w 1 -b 0.0.0.0:${PORT:-8800} app:app
