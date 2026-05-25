import AsyncStorage from '@react-native-async-storage/async-storage';

const BASE_URL = 'http://10.0.2.2:5000/api';

const getHeaders = async () => {
  const token = await AsyncStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` })
  };
};

export const api = {
  post: async (path, body) => {
    const headers = await getHeaders();
    const res = await fetch(`${BASE_URL}${path}`, {
      method: 'POST',
      headers,
      body: JSON.stringify(body)
    });
    return res.json();
  },
  get: async (path) => {
    const headers = await getHeaders();
    const res = await fetch(`${BASE_URL}${path}`, { headers });
    return res.json();
  }
};
