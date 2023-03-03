import axios from "axios";

const makeRequest = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

export default makeRequest;
