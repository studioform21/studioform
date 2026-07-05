import axios from "axios";

const getBaseURL = () => {
    if (process.env.REACT_APP_BACKEND_URL) {
        return process.env.REACT_APP_BACKEND_URL;
    }
    if (typeof window !== "undefined" && (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1")) {
        return "http://localhost:5000";
    }
    return "";
};

export const API = `${getBaseURL()}/api`;
export const http = axios.create({ baseURL: API });
