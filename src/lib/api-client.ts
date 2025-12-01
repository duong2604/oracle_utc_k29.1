import axios from "axios";

// API Base URL from environment or default
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api/v1";

// Create axios instance with default config
export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    // You can add auth tokens here if needed
    // const token = localStorage.getItem('token');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle common errors
    if (error.response) {
      const { status, data, config } = error.response;

      // Handle specific status codes
      switch (status) {
        case 401:
          console.error("❌ Unauthorized access");
          break;
        case 403:
          console.error("❌ Forbidden");
          break;
        case 404:
          console.error("❌ Resource not found:", config?.url);
          break;
        case 500:
          console.error("❌ Server error:", {
            url: config?.url,
            method: config?.method,
            data: config?.data,
            errorMessage:
              data?.message || data?.error || "Internal Server Error",
            errorDetails: data,
          });
          break;
        default:
          console.error("❌ API Error:", {
            status,
            message: data?.message || error.message,
            url: config?.url,
          });
      }
    } else if (error.request) {
      console.error(
        "❌ No response from server - Is the backend running on http://localhost:8080?"
      );
      console.error("Request details:", error.config?.url);
    } else {
      console.error("❌ Request error:", error.message);
    }

    return Promise.reject(error);
  }
);

export default apiClient;
