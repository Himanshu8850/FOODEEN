# FOODEEN - Food Donation Platform

**Author:** Himanshu  
**Version:** 1.0.0  
**License:** MIT  

## Overview

FOODEEN is a web application that reduces food waste by facilitating the donation of surplus food from restaurants to NGOs and charitable organizations. The platform connects food donors with recipients, making it easy to share excess food and support communities in need.

## Features

### Core Functionality
- **User Authentication**: Separate registration and login for Restaurants and NGOs
- **Food Listings Management**: Restaurants can create, update, and manage surplus food listings
- **Smart Recommendations**: ML-powered recommendations for NGOs based on food preferences
- **Order Management**: Complete order workflow from request to fulfillment
- **Real-time Chat**: Built-in chat system for coordinating pickups and deliveries
- **Route Planning**: Integrated mapping and route calculation for efficient food delivery
- **Review System**: Sentiment analysis-powered review system for accountability
- **Dark Mode**: Full dark mode support across the application

### Technology Stack

#### Frontend
- React 18.2 + Vite
- Tailwind CSS for styling
- Three.js for 3D animated backgrounds
- Socket.IO for real-time communication
- Leaflet for maps and routing
- Axios for API requests

#### Backend
- Flask (Python) with Flask-SocketIO
- MongoDB with MongoEngine ODM
- Machine Learning:
  - Matrix Factorization for collaborative filtering
  - Content-based filtering
  - Sentiment analysis using scikit-learn
- OpenRouteService for route calculation

## Installation

### Prerequisites
- Node.js (v16 or higher)
- Python 3.8+
- MongoDB
- npm or yarn

### Client Setup
```bash
cd client
npm install
npm run dev
```

### Server Setup
```bash
cd server
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python app.py
```

### Environment Variables

Create `.env` files in both client and server directories:

**Client `.env`:**
```
VITE_API_URL=http://127.0.0.1:8800
VITE_SOCKET_URL=http://127.0.0.1:8800
```

**Server `.env`:**
```
MONGO_URI=your_mongodb_connection_string
DB_NAME=foody
OPENROUTE_API_KEY=your_openroute_api_key
```

## Usage

### For Restaurants
1. Register as a Restaurant
2. Add surplus food listings with details (name, quantity, expiry, food type)
3. Manage incoming donation requests from NGOs
4. Accept/decline requests
5. Use real-time chat to coordinate pickup
6. Mark orders as fulfilled when complete
7. Leave reviews for NGOs

### For NGOs
1. Register as an NGO/Charity
2. Browse available food listings
3. View ML-powered recommendations based on preferences
4. Request food items from restaurants
5. Use chat to arrange logistics
6. Confirm receipt and mark as fulfilled
7. Leave reviews for restaurants

## Key Features Explained

### Machine Learning Recommendations
- **Collaborative Filtering**: Uses matrix factorization to recommend items based on similar NGO preferences
- **Content-Based Filtering**: Recommends food based on NGO's historical food type preferences (Vegetarian, Vegan, Non-Vegetarian)
- **Sentiment Analysis**: Analyzes reviews to provide insights on restaurant and NGO reliability

### Order Lifecycle
1. **Requested**: NGO submits a request for food items
2. **Accepted**: Restaurant accepts the request and generates verification codes
3. **Fulfilled**: Both parties confirm with verification codes
4. **Cancelled**: Either party can cancel with valid code
5. **Dismissed**: Auto-dismissed if not processed

### Security Features
- Verification codes for order fulfillment and cancellation
- Password hashing for user authentication
- Input validation and sanitization
- CORS protection

## Contributing

This is a personal project by Himanshu. If you'd like to contribute or report issues, please contact the author.

## License

MIT License

Copyright (c) 2025 Himanshu

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

## Acknowledgments

- OpenRouteService for routing API
- MongoDB for database
- React and Flask communities for excellent documentation
- All open-source libraries used in this project

---

**Made with ❤️ by Himanshu**
