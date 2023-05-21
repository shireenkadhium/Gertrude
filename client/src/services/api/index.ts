import httpClient from '@/services/httpClient'
import type { AxiosRequestConfig } from 'axios'
import type { CreateIndexDto, CreateUserDto, LoginDto } from '@/services/api/interfaces'

type API = {
  [key: string]: (data?: any, config?: AxiosRequestConfig) => Promise<any>
}

const api: API = {
  login: (credentials: LoginDto) => {
    return httpClient.post('/auth/sign-in', credentials)
  },
  getDocumentsIndexes: () => {
    return httpClient.get('/indexes')
  },
  // createDocumentsIndex: (creatIndexDto: CreateIndexDto) => {
  createDocumentsIndex: (files: FormData[]) => {
    return httpClient.post('/indexes', files, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  },
  removeDocumentsIndex: (id: string) => {
    return httpClient.delete(`/indexes/${id}`)
  },
  getAnswer: (prompt: string) => {
    return httpClient.get(`/indexes`, {
      params: {
        prompt
      }
    })
  },
  getUsers: () => {
    return httpClient.get('/users')
  },
  createUser: (user: CreateUserDto) => {
    return httpClient.post('/users', user)
  },
  removeUser: (id: string) => {
    return httpClient.delete(`/users/${id}`)
  }
}

export default api
