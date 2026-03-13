import axios from 'axios';

// Get backend URL from env, or default to port 5000 (standard backend dev port)
// IMPORTANT: In production, set VITE_API_URL to your Render/Railway URL (e.g. https://hms-api.onrender.com/api)
// Robust URL handling: ensure it ends with /api even if user forgot to add it
let baseEnvUrl = import.meta.env.VITE_API_URL || '';
if (baseEnvUrl && !baseEnvUrl.endsWith('/api')) {
  baseEnvUrl = baseEnvUrl.endsWith('/') ? `${baseEnvUrl}api` : `${baseEnvUrl}/api`;
}
const API_URL = baseEnvUrl || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  // include HTTPOnly Cookies (JWT) in all cross-origin requests
  withCredentials: true
});

// Response Interceptor for Error Handling
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Basic global error handling
    if (error.response && error.response.status === 401) {
      console.warn("Unauthorized request. Redirecting to login...");
      // We can trigger a logout or redirect event here via context
    }
    return Promise.reject(error);
  }
);

export default api;
