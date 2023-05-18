import axios from 'axios'
import { authStore } from '@/store'

const httpClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL
})

httpClient.interceptors.response.use(function (response) {
  return response.data
})

httpClient.interceptors.request.use((config) => {
  const { accessToken } = authStore
  if (accessToken && !config.url?.includes('auth')) {
    config.headers.Authorization = `Bearer ${accessToken}`
  }
  return config
})

export default httpClient
