from flask import Flask, jsonify, send_from_directory
from flask_socketio import SocketIO, join_room, emit
from flask_cors import CORS
from datetime import datetime
import json
from bson import ObjectId
from dotenv import load_dotenv
import os
import osmnx as ox
import networkx as nx
from db import connect_db

# Load environment variables
load_dotenv()

# Initialize Flask app (serves built client from ./static)
app = Flask(__name__, static_folder="static", static_url_path="/")

# Configure and connect MongoDB
connect_db()

# Get frontend URL from environment or use default
FRONTEND_URL = os.getenv('FRONTEND_URL', 'http://localhost:5173')

# Allow both localhost ports (5173 and 5174) for development, plus production domain
CORS_ORIGINS = [FRONTEND_URL, 'http://localhost:5173', 'http://localhost:5174', 'http://127.0.0.1:5173', 'http://127.0.0.1:5174']

# In production, when frontend is served from same origin, use '*' for SocketIO
# Check if running in production (FRONTEND_URL contains https)
if FRONTEND_URL.startswith('https://'):
    # Production: allow the specific domain
    socketio = SocketIO(app, cors_allowed_origins='*', async_mode='eventlet')
else:
    # Development: restrict to specific origins
    socketio = SocketIO(app, cors_allowed_origins=CORS_ORIGINS, async_mode='eventlet')

# Enable CORS
if FRONTEND_URL.startswith('https://'):
    # Production: allow all origins since frontend is served from same domain
    CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=True)
else:
    # Development: restrict to specific origins
    CORS(app, resources={r"/*": {"origins": CORS_ORIGINS}}, supports_credentials=True)

# Custom JSON Encoder
class MongoJSONEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, datetime):
            return obj.isoformat()  # Convert datetime to ISO 8601 format
        elif isinstance(obj, ObjectId):
            return str(obj)  # Convert ObjectId to string
        return super().default(obj)

app.json_encoder = MongoJSONEncoder

# Import blueprints
from routes.order_routes import order_bp
from routes.listing_routes import listing_bp
from routes.auth_routes import auth_bp
from routes.user_routes import user_bp
from routes.recommendation_routes import recommendations_bp
from routes.graph_routes import graph_bp
from routes.content_filtering import content_filter_bp
from routes.sentiment_routes import sentiment_bp
from routes.route_routes import route_bp 
from models.chat import Chat  # Import the Chat model

# Register blueprints
app.register_blueprint(auth_bp)
app.register_blueprint(order_bp)
app.register_blueprint(listing_bp)
app.register_blueprint(user_bp)
app.register_blueprint(recommendations_bp)
app.register_blueprint(graph_bp)
app.register_blueprint(content_filter_bp)
app.register_blueprint(sentiment_bp)
app.register_blueprint(route_bp)

# Socket.IO Events
@socketio.on('connect')
def handle_connect():
    print('A user connected!')

@socketio.on('join_chat_room')
def handle_join_chat_room(orderId):
    join_room(orderId)
    print(f'User joined room for order {orderId}')

@socketio.on('send_chat_message')
def handle_send_chat_message(data):
    message = data.get('message')
    order_id = data.get('orderId')
    sender = data.get('sender')

    # Save message to MongoDB
    new_message = Chat(message=message, sender=sender, orderId=order_id)
    try:
        new_message.save()
        print('Message saved successfully!')
        emit('receive_chat_message', {'message': message, 'sender': sender}, to=order_id)
    except Exception as e:
        print(f'Error saving message: {str(e)}')

@socketio.on('disconnect')
def handle_disconnect():
    print('A user disconnected!')


# Serve built client
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve_client(path):
    static_dir = app.static_folder
    # Serve static assets directly if they exist
    if path and os.path.exists(os.path.join(static_dir, path)):
        return send_from_directory(static_dir, path)
    # Fallback to index.html for SPA routes
    return send_from_directory(static_dir, 'index.html')

# Run the app with SocketIO
if __name__ == '__main__':
    # Configure OSMnx (version 2.0+ uses different API)
    import osmnx as ox
    ox.settings.log_console = True
    ox.settings.use_cache = True
    socketio.run(app, host='0.0.0.0', port=int(os.getenv('PORT', 8800)), debug=True)
