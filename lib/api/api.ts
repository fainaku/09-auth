import axios from "axios";

export const nextServer = axios.create({
  baseURL: "https://09-auth-lilac-tau.vercel.app",
  withCredentials: true,
});
axios.defaults.headers.common["Authorization"] = `Bearer ${
  process.env.NEXT_PUBLIC_NOTEHUB_TOKEN
}`;
