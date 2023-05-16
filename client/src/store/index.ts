import { reactive, ref } from 'vue'

const ACCESS_TOKEN_NAMESPACE = 'gertrude/accessToken'

const accessToken = ref(localStorage.getItem(ACCESS_TOKEN_NAMESPACE) || '')
const isAuthenticated = ref(false)

export const authStore = reactive({
  isAuthenticated,
  accessToken,
  login: (username: string, password: string) => {
    return new Promise((resolve, reject) => {
      resolve('token')
    })
  }
})
