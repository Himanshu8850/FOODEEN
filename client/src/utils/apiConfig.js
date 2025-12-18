/**
 * API Configuration
 * Auto-detects the API URL based on environment
 */

export const API_URL = import.meta.env.VITE_API_URL || 
  (typeof window !== 'undefined' && window.location.hostname !== 'localhost' 
    ? window.location.origin 
    : "http://127.0.0.1:8800");

export const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || API_URL;
