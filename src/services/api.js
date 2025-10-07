import axios from "axios";

const API_BASE = process.env.REACT_APP_API_URL
  ? `${process.env.REACT_APP_API_URL}/api`
  : "http://localhost:3001/api";

export const fetchSongs = async (params) => {
  try {
    const response = await axios.get(`${API_BASE}/songs`, { params });

    return response.data;
  } catch (error) {
    console.error("Error fetching songs:", error);
    throw error;
  }
};
