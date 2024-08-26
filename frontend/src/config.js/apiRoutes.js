// src/config/apiRoutes.js

const API_BASE_URL = "http://localhost:3000/api/v1";

const API_ROUTES = {
    USER_LIST : `${API_BASE_URL}/user/bulk/`,
  SIGNUP: `${API_BASE_URL}/user/signup`,
  LOGIN: `${API_BASE_URL}/user/signin`,
  DASHBOARD: `${API_BASE_URL}/dashboard`,
  USER_DETAILS: `${API_BASE_URL}/loginUser`,
  GETBALANCE: `${API_BASE_URL}/account/balance`,
  FUNDTRANSFER: `${API_BASE_URL}/account/transfer`
  // Add more routes as needed
};

export default API_ROUTES;
