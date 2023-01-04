import axios from "axios";

const api = axios.create({
    baseURL: 'http://localhost:3030',
    headers: {
        Authorization : `Bearer ${localStorage.getItem("TOKEN")}`
    }
})

export default api