import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const loginUser = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, credentials);
    return response.data;
  } catch (error) {
    console.error('Login failed:', error);
    throw error;
  }
};

// Other API calls (register, chat messages, etc.) will be added here
