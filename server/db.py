import os
from mongoengine import connect, disconnect
from dotenv import load_dotenv
from urllib.parse import quote_plus

# Load environment variables from .env file
load_dotenv()

def connect_db(app=None):
    """Initialize the database connection using MongoEngine directly"""
    try:
        # Disconnect any existing connections
        disconnect()
        
        mongo_uri = os.getenv("MONGO_URI")
        db_name = os.getenv("MONGODB_DB_NAME", "FOODUSE")
        
        # Debug: Print loaded environment variables
        print(f"✓ MONGO_URI loaded: {mongo_uri[:50]}..." if mongo_uri else "✗ MONGO_URI not loaded")
        print(f"✓ DB_NAME: {db_name}")
        
        # Append database name to the URI if not already there
        if not mongo_uri.endswith(f"/{db_name}"):
            if mongo_uri.endswith("/"):
                connection_string = f"{mongo_uri}{db_name}"
            else:
                connection_string = f"{mongo_uri}/{db_name}"
        else:
            connection_string = mongo_uri
        
        # Connect directly to MongoDB using the full connection string including database name
        connect(db_name, host=connection_string)
        
        print("✓ MongoDB connected successfully")
        print(f"✓ Configured to use database: {db_name}")
        return None  # Return None as we're using MongoEngine directly now
    except Exception as e:
        print(f"✗ MongoDB connection failed: {e}")
        raise SystemExit(1)
