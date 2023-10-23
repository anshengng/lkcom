import Axios from "./Axios";

const http = new Axios({
    baseURL: '/api',
    timeout: 3000,
    headers: {}
})

export { http }
