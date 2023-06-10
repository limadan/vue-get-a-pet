import axios from "axios";

let url = 'https://get-a-pet-api-czhos7wzpa-uc.a.run.app'

const api = axios.create({
    baseURL: url,
    headers: {
        Authorization : `Bearer ${localStorage.getItem("TOKEN")}`
    }
})

export default api