import httpClient from '@/services/httpClient'
import type { AxiosRequestConfig } from 'axios'
import type { LoginDto } from '@/services/api/interfaces'

type API = {
  [key: string]: (data?: any, config?: AxiosRequestConfig) => Promise<any>
}

const api: API = {
  login: (credentials: LoginDto) => {
    return httpClient.post('/auth/sign-in', credentials)
  }
}

export default api
