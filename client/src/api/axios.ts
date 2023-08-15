import axios from 'axios';

export default axios.create({
    baseURL: 'http://localhost:4000'
});

export const axiosPrivate = axios.create({
    baseURL: 'http://localhost:4000',
    headers: { 'Content-Type': 'application/json' }
});