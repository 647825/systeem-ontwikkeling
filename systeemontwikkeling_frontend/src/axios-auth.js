import axios from "axios";
/**
 * Create a new axios instance
 * @type {AxiosInstance}
 * @description this is the axios instance that will be used in the app
 */
const instance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
})

export default instance;