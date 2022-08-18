// this service dealing making  http request and sending the data back setting any data to localstorage

import axios from 'axios';

// Rigster user
const register = async (userData) => {
  const response = await axios.post(
    'http://localhost:5000/api/users/',
    userData
  );

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }

  return response.data;
};

// login user
const login = async (userData) => {
  const response = await axios.post(
    'http://localhost:5000/api/users/login',
    userData
  );

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }

  return response.data;
};

//logout
const logout = () => {
  localStorage.removeItem('user');
};
const authService = {
  register,
  logout,
  login,
};
export default authService;
