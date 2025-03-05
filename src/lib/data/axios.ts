import axios from "axios";
import { parseCookies } from "nookies";

const { token_admin, token } = parseCookies();

const instanceAxios = axios.create({
  baseURL: "http://localhost:3001/api/v1",
  method: "GET",
});

if (token_admin)
  instanceAxios.defaults.headers[
    "authorization_admin"
  ] = `Bearer ${token_admin}`;

if (token) instanceAxios.defaults.headers["authorization"] = `Bearer ${token}`;

export default instanceAxios;
