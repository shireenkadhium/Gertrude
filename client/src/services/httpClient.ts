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
  console.log(1, accessToken)
  console.log(2, localStorage.getItem('gertrude/accessToken'))
  if (accessToken && !config.url?.includes('auth')) {
    config.headers.Authorization = `Bearer ${accessToken}`
  }
  return config
})

export default httpClient
