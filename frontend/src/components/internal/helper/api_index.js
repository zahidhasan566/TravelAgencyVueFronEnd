import axios from 'axios'
// import store from 'store'
import routes from '../../../routes'
// import { notification } from 'ant-design-vue'

const apiClient = axios.create({
    // baseURL: '/api',
    baseURL: process.env.VUE_APP_API_URL,
    // timeout: 1000,
    // headers: { 'X-Custom-Header': 'foobar' }
})

apiClient.interceptors.request.use(request => {
    const token = localStorage.getItem("token");
    if (token) {
        request.headers.Authorization = `Bearer ${token}`
        request.headers.AccessToken = token
    }
    return request
})

apiClient.interceptors.response.use(response => response, error => {
    // Errors handling
    const { response } = error
    const { data } = response
    if (data.code === 403) {
        routes.push({ path: '*', redirect: 'auth/404', hidden: true })
    }
    return Promise.reject(error)
})

export default apiClient