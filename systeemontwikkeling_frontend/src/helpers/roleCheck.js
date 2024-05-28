import axios from "../axios-auth";
import { requestHeader } from "./requestHeader";   

const requestAccess = async (role) => {
    const headers = requestHeader();
    return axios.get(`accessControl/${role}`, { headers }).then((response) => {
        return response.status === 200 ? true : false;
    }).catch(() => {
        return false;
    });
};

export default requestAccess;