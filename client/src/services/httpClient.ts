import axios from 'axios'
import { authStore } from '@/store/auth.store'

const httpClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL
})

httpClient.interceptors.response.use(
  function (response) {
    return response.data
  },
  function (error) {
    if (error.response.status === 401) {
      authStore.reset()
    }
    return Promise.reject(error)
  }
)

httpClient.interceptors.request.use((config) => {
  const { accessToken } = authStore
  if (accessToken && !config.url?.includes('auth')) {
    config.headers.Authorization = `Bearer ${accessToken}`
  }
  return config
})

export default httpClient
