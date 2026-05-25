const BASE_URL = 'https://dapur-mama-8di5.onrender.com/api';

const getHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` })
  };
};

export const api = {
  post: async (path, body) => {
    const res = await fetch(`${BASE_URL}${path}`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(body)
    });
    return res.json();
  },
  get: async (path) => {
    const res = await fetch(`${BASE_URL}${path}`, { headers: getHeaders() });
    return res.json();
  }
};
