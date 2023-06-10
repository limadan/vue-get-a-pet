import axios from "axios";

const api = axios.create({
    baseURL: 'get-a-pet-api-container',
    headers: {
        Authorization : `Bearer ${localStorage.getItem("TOKEN")}`
    }
})

export default api