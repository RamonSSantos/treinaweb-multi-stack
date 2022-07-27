import axios from "axios";

export const ApiService = axios.create({
  baseURL: "",
  headers: {
    "Content-Type": "application/json",
  },
});
