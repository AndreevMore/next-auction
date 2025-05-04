import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;
const apiKey = process.env.NEXT_PUBLIC_API_KEY;

export const api = axios.create({
  baseURL: baseURL,
  headers: {
    "api-key": apiKey,
  },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error);
    return Promise.reject(error);
  }
);
