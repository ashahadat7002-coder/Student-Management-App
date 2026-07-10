import axios from "axios";

const API = axios.create({
    baseURL: "https://student-management-app-1-u7yr.onrender.com",
});
export default API;