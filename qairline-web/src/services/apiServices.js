import axios from "axios";
import API_BASE_URL from "../config";

export const fetchAllArticles = async (
  setAllArticles,
  setLoading,
  setError
) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/news/getAll`);
    setAllArticles(response.data.result);
    setLoading(false);
  } catch (err) {
    setError(err.message);
    setLoading(false);
  }
};
