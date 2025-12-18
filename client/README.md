# FOODEEN - Client Application

**Author:** Himanshu  
**License:** MIT

## Overview

This is the frontend React application for FOODEEN, a food donation platform that connects restaurants with NGOs to reduce food waste.

## Tech Stack

- React 18.2 + Vite
- Tailwind CSS
- Three.js for 3D backgrounds
- Socket.IO for real-time chat
- React Router for navigation
- Axios for API calls
- Leaflet for maps

## Getting Started

```bash
npm install
npm run dev
```

The app will run on `http://localhost:5174`

## Environment Variables

Create a `.env` file:

```
VITE_API_URL=http://127.0.0.1:8800
VITE_SOCKET_URL=http://127.0.0.1:8800
```

## Features

- User authentication (Restaurant/NGO)
- Food listings management
- ML-powered recommendations
- Real-time chat
- Order management
- Route planning
- Dark mode support
- Responsive design

## Build

```bash
npm run build
```

---

This template uses Vite with HMR and ESLint. Two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

**Made with ❤️ by Himanshu**
