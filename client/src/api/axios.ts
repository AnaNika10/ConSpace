import axios from 'axios';
import config from "../config/local.json";

const BASE_URL = config.API_GATEWAY;

export default axios.create({
    baseURL: BASE_URL
});

export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json' }
});