import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5280', // backend URL
});

export default api;
