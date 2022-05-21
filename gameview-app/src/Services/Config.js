import axios from "axios";

export const axiosBase = axios.create({
    baseURL: "https://gameview-api.herokuapp.com/api"
})