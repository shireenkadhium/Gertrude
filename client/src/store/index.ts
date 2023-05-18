import { reactive, ref } from 'vue'

const ACCESS_TOKEN_NAMESPACE = 'gertrude/accessToken'
const REFRESH_TOKEN_NAMESPACE = 'gertrude/accessToken'

const accessToken = ref(localStorage.getItem(ACCESS_TOKEN_NAMESPACE) || '')
const refreshToken = ref(localStorage.getItem(REFRESH_TOKEN_NAMESPACE) || '')
const isAuthenticated = ref(Boolean(accessToken.value))

export const authStore = reactive({
  isAuthenticated,
  accessToken,
  refreshToken
})
