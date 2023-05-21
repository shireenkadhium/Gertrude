<script>
import api from '@/services/api'
import { authStore } from '@/store'
import { ElNotification } from 'element-plus'

const ACCESS_TOKEN_NAMESPACE = 'gertrude/accessToken'
const REFRESH_TOKEN_NAMESPACE = 'gertrude/accessToken'

export default {
  data() {
    return {
      form: {
        email: 's.rykov@mobidev.biz',
        password: 'Admin@123'
      },
      emailRules: [
        { required: true, message: 'Please enter your email', trigger: 'blur' },
        { type: 'email', message: 'Invalid email format', trigger: ['blur', 'change'] }
      ],
      passwordRules: [
        { required: true, message: 'Please enter your password', trigger: 'blur' },
        { min: 6, message: 'Password length should be at least 6 characters', trigger: 'blur' }
      ]
    }
  },
  methods: {
    submitForm() {
      this.$refs.loginForm.validate(async (valid) => {
        if (valid) {
          const { email: username, password } = this.form
          try {
            const { accessToken, refreshToken } = await api.login({ username, password })
            authStore.accessToken = accessToken
            authStore.refreshToken = refreshToken
            authStore.isAuthenticated = true
            localStorage.setItem(ACCESS_TOKEN_NAMESPACE, accessToken)
            localStorage.setItem(REFRESH_TOKEN_NAMESPACE, refreshToken)
            this.$router.replace('/chat')
          } catch (err) {
            console.log(err)
            ElNotification({
              title: 'Error',
              message: 'Wrong Credentials',
              type: 'error'
            })
          }
        } else {
          // Form is invalid
          console.log('Form is invalid')
          return false
        }
      })
    }
  }
}
</script>

<template>
  <div class="login-form">
    <h1 class="logo">Gertrude</h1>
    <el-form ref="loginForm" :model="form" label-position="left" size="medium">
      <el-form-item label="Email" prop="email" :rules="emailRules" class="form-label">
        <el-input v-model="form.email" placeholder="Enter your email"></el-input>
      </el-form-item>
      <el-form-item label="Password" prop="password" :rules="passwordRules" class="form-label">
        <el-input
          v-model="form.password"
          placeholder="Enter your password"
          show-password
        ></el-input>
      </el-form-item>
      <el-form-item class="form-controls">
        <el-button type="primary" @click="submitForm">Login</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<style scoped>
.login-form {
  max-width: 300px;
  margin: auto;
  display: flex;
  align-items: center;
  align-self: center;
  flex-direction: column;
}

.el-form {
  width: 300px;
}

.el-form-item {
  margin-bottom: 20px;
  flex-direction: column;
}

.form-label .el-form-item__label {
  justify-content: flex-start;
}

.form-controls {
  padding-top: 32px;
}

.form-controls .el-form-item__content {
  margin-left: 0;
}

.form-controls button {
  width: 100%;
}

.logo {
  margin: 10px;
  color: #c9c4bd;
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 2px;
  user-select: none;
}
</style>