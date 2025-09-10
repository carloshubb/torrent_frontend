import axios from 'axios';

const API_BASE_URL = 'https://api.1331.com.1331x.com/api';  // adjust if needed
// Create an Axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Automatically attach token if it exists in localStorage
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
}, error => Promise.reject(error));
export default {
  // Generic GET with optional query params object
  get(url, params = {}) {
    const queryString = new URLSearchParams(params).toString();
    const fullUrl = queryString ? `${API_BASE_URL}${url}?${queryString}` : `${API_BASE_URL}${url}`;
    return axios.get(fullUrl);
  },

  getTorrents(params = {}) {
    return this.get('/torrents', params);
  },

  getTorrent(id) {
    return axios.get(`${API_BASE_URL}/torrents/${id}`);
  },

  getUploadTorrents() {
    return  api.get(`${API_BASE_URL}/uploads`);
  },

  createTorrent(data) {
    const token = localStorage.getItem('token');
    return axios.post(`${API_BASE_URL}/torrents`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data", // ✅ let axios handle FormData
      },
    });
  },

  // Add more API calls here as needed, for example:
  updateTorrent(id, data) {
    return axios.put(`${API_BASE_URL}/torrents/${id}`, data);
  },

  // Add more API calls here as needed, for example:
  saveTorrent(data) {
    return axios.post(`${API_BASE_URL}/savetorrent`, data);
  },
  // ✅ Delete torrent using POST with ID in body
  deleteTorrent(id) {
    return axios.post(`${API_BASE_URL}/torrents/delete`, { id });
  },
  // Login function
  login(form) {    
    return api.post('/login', {
      email: form.email,
      password: form.password,
    }).then(response => {
      // Save token in localStorage for future requests
      const token = response.data.token;
      localStorage.setItem('token', token);
      return response.data;
    });
  },
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  getUser() {
    return JSON.parse(localStorage.getItem('user') || 'null');
  },

  isLoggedIn() {
    return !!localStorage.getItem('token');
  }
};
