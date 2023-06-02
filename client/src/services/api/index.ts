import httpClient from '@/services/httpClient'
import type { AxiosRequestConfig } from 'axios'
import type { CreateUserDto, LoginDto, UpdateUserDto } from '@/services/api/interfaces'

type API = {
  [key: string]: (data?: any, config?: AxiosRequestConfig) => Promise<any>
}

const api: API = {
  login: (credentials: LoginDto) => {
    return httpClient.post('/auth/sign-in', credentials)
  },
  getDocumentsIndexes: () => {
    return httpClient.get('/chats')
  },
  createDocumentsIndex: (formData: FormData) => {
    return httpClient.post('/chats', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  },
  removeDocumentsIndex: (id: string) => {
    return httpClient.delete(`/chats/${id}`)
  },
  getAnswer: (payload) => {
    const { id, params } = payload
    return httpClient.get(`/chats/${id}`, { params })
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
  updateUser: ({ id, body }: { id: string; body: UpdateUserDto }) => {
    return httpClient.patch(`/users/${id}`, body)
  },
  removeUser: (id: string) => {
    return httpClient.delete(`/users/${id}`)
  }
}

export default api
