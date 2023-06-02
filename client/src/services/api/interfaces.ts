export type LoginDto = {
  username: string
  password: string
}

export type CreateIndexDto = {
  files: FormData[]
  name: string
}

export type CreateUserDto = {
  email: string
  password: string
  firstName: string
  lastName: string
  roles?: ['user', 'admin']
}

export type UpdateUserDto = {
  email?: string
  password?: string
  firstName?: string
  lastName?: string
}
