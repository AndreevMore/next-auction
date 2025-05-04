import axiosFactory from 'axios';

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;
const apiKey = process.env.NEXT_PUBLIC_API_KEY;

export const axios = axiosFactory.create({
  baseURL: baseURL,
  headers: {
    'api-key': apiKey,
  },
});

axios.interceptors.response.use(
  (response) => {
    if (typeof response.data.message === 'string') {
      console.log(response.data.message, 'error');
    }
    return response;
  },
  (error) => {
    console.log('API Error:', error);
    return Promise.reject(error);
  }
);
