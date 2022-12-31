import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true, // when you need to set the cookies, along the request
  headers: {
    'Content-type': 'application/json',
    Accept: 'application/json',
  },
  // http://localhost:5500/api/send-otp
});

//list of all the endpoinsts
export const sendOtp = (data) => api.post('/api/send-otp', data);
export const verifyOtp = (data) => api.post('/api/verify-otp', data);

export default api;