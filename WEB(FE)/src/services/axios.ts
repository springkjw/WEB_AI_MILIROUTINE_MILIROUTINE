import axios from "axios";

const BASE_URL = "";

export const axiosClient = axios.create({
  baseURL: BASE_URL,
  timeout: 10_000,
});
