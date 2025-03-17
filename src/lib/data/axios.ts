import axios from "axios";
import { parseCookies } from "nookies";

const { token_admin, token } = parseCookies();

const instanceAxios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  method: "GET",
});

if (token_admin)
  instanceAxios.defaults.headers[
    "authorization_admin"
  ] = `Bearer ${token_admin}`;

if (token) instanceAxios.defaults.headers["authorization"] = `Bearer ${token}`;

export default instanceAxios;
