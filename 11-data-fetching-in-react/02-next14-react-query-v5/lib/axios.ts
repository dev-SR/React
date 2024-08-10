import axios from 'axios';
// console.log("apiClient:",process.env.BASE_URL);

const apiClient = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_BASE_URL
});

export default apiClient;
