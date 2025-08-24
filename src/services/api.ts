import axios from 'axios';
import {BASE_URL} from '../constants/apiUrl';
import AsyncStorage from '@react-native-async-storage/async-storage';

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

api.interceptors.request.use(
  async config => {
    try {
      const token = await AsyncStorage.getItem('@accessToken');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.log('Error retrieving access token from storage: ', error);
    }

    return config;
  },
  error => Promise.reject(error),
);

api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
    }
    return Promise.reject(error);
  },
);

export default api;
