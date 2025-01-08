// src/utils/api.js
import axios from 'axios';

const API_KEY = import.meta.env.VITE_GIPHY_API_KEY;
const BASE_URL = 'https://api.giphy.com/v1/gifs';

export const fetchGifs = async (query) => {
  try {
    const response = await axios.get(`${BASE_URL}/search`, {
      params: {
        q: query,
        api_key: API_KEY,
        limit: 25,
      },
    });
    return response.data.data;
  } catch (error) {
    console.error('Error fetching GIFs:', error);
    return [];
  }
};
