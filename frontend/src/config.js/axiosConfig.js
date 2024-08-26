import axios from "axios";
import API_ROUTES from "./apiRoutes";

// Create an Axios instance
const apiClient = axios.create({
  baseURL: API_ROUTES.BASE_URL, // Your base API URL
});

// Add a request interceptor to include the token in headers
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;
