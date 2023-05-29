import { reactive, ref } from 'vue'

const ACCESS_TOKEN_NAMESPACE = 'gertrude/accessToken'
const REFRESH_TOKEN_NAMESPACE = 'gertrude/refreshToken'
const ROLES_NAMESPACE = 'gertrude/roles'

const storedRoles = JSON.parse(localStorage.getItem(ROLES_NAMESPACE) as string)

const accessToken = ref(localStorage.getItem(ACCESS_TOKEN_NAMESPACE) || '')
const refreshToken = ref(localStorage.getItem(REFRESH_TOKEN_NAMESPACE) || '')
const isAuthenticated = ref(Boolean(accessToken.value))
const roles = ref(storedRoles || [])

export const authStore = reactive({
  isAuthenticated,
  accessToken,
  refreshToken,
  roles,
  reset() {
    localStorage.removeItem(ACCESS_TOKEN_NAMESPACE)
    localStorage.removeItem(REFRESH_TOKEN_NAMESPACE)
    localStorage.removeItem(ROLES_NAMESPACE)
    roles.value = []
    accessToken.value = ''
    refreshToken.value = ''
    isAuthenticated.value = false
  }
})
