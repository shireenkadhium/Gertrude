import httpClient from '@/services/httpClient'
import type { AxiosRequestConfig } from 'axios'
import type {
  CreateIndexDto,
  CreateUserDto,
  LoginDto,
  UpdateUserDto
} from '@/services/api/interfaces'

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
  setApiKey: (body) => {
    return httpClient.post('/settings/openapi-key', body)
  },
  getApiKey: () => {
    return httpClient.get('/settings/openapi-key')
  },
  deleteApiKey: () => {
    return httpClient.delete('/settings/openapi-key')
  },
  getUsers: () => {
    return httpClient.get('/users')
  },
  createUser: (createUserDto: CreateUserDto) => {
    return httpClient.post('/users', createUserDto)
  },
  updateUser: (id: string, updateUserDto: UpdateUserDto) => {
    return httpClient.patch(`/users/${id}`, updateUserDto)
  },
  removeUser: (id: string) => {
    return httpClient.delete(`/users/${id}`)
  }
}

export default api
