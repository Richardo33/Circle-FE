import axios from "axios";

const API_URL = "http://localhost:3000/api/v1/thread";

export const getThreads = async () => {
  const res = await axios.get(`${API_URL}/threads`, {
    withCredentials: true,
  });
  return res.data.data.threads;
};
