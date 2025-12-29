import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_BASE_URL}/api/v1/thread`;

export const getThreads = async () => {
  const res = await axios.get(`${API_URL}/threads`, {
    withCredentials: true,
  });
  return res.data.data.threads;
};
