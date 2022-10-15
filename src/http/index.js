import axios from "axios";

const $host = axios.create({
    baseURL: process.env.REACT_APP_API_URL
})

const $authHost = axios.create({
    baseURL: process.env.REACT_APP_API_URL
})
const $authHostStats = axios.create({
    baseURL: process.env.REACT_APP_API_STATS_URL
})

const authInterceptor = config => {
    if (localStorage.getItem('token')){
        config.headers.authorization = `Bearer ${localStorage.getItem('token')}`
    }
    return config
}

$authHost.interceptors.request.use(authInterceptor)
$authHostStats.interceptors.request.use(authInterceptor)

$authHost.interceptors.response.use((config) => {
    return config;
},(error) => {
    if (error?.response?.status){
        if (error.response.status == 401) {
            localStorage.removeItem('token')
            localStorage.removeItem('username')
            localStorage.removeItem('refresh')
            localStorage.removeItem('id')
            window.location.reload()
        }
    }
    return Promise.reject(error);

})

export {
    $host,
    $authHost,
    $authHostStats
}
