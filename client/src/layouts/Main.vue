<script lang="ts" setup>
import { Document, Lock, ChatSquare, User, Setting } from '@element-plus/icons-vue'
import { authStore } from '@/store'
import { useRouter } from 'vue-router'

const router = useRouter()

const ACCESS_TOKEN_NAMESPACE = 'gertrude/accessToken'
const REFRESH_TOKEN_NAMESPACE = 'gertrude/accessToken'

const logout = () => {
  authStore.accessToken = ''
  authStore.refreshToken = ''
  authStore.isAuthenticated = false
  localStorage.removeItem(ACCESS_TOKEN_NAMESPACE)
  localStorage.removeItem(REFRESH_TOKEN_NAMESPACE)
  router.replace('/login')
}

const isAdmin = authStore.roles.includes('admin')
</script>

<template>
  <el-container class="app-layout">
    <el-aside width="200px">
      <h2 class="logo">Gertrude</h2>
      <el-menu default-active="1" class="el-menu-vertical-demo" router>
        <el-menu-item index="1" route="chat">
          <el-icon><chat-square /></el-icon>
          <span>Chat</span>
        </el-menu-item>
        <div v-if="isAdmin">
          <el-menu-item index="2" route="documents">
            <el-icon><document /></el-icon>
            <span>Document</span>
          </el-menu-item>
          <el-menu-item index="3" route="users">
            <el-icon><user /></el-icon>
            <span>Users</span>
          </el-menu-item>
          <el-menu-item index="4" route="settings">
            <el-icon><setting /></el-icon>
            <span>Settings</span>
          </el-menu-item>
        </div>
      </el-menu>
      <el-button type="text" class="logout-button" @click="logout">
        <el-icon><lock /></el-icon>
        <span>Logout</span>
      </el-button>
    </el-aside>
    <el-main>
      <router-view></router-view>
    </el-main>
  </el-container>
</template>

<style scoped>
.app-layout {
  height: 100%;
}
.app-layout .el-header {
  position: relative;
  color: #c9c4bd;
}
.app-layout .el-aside {
  color: #c9c4bd;
  display: flex;
  flex-direction: column;
  background: #082645;
}
.app-layout .el-menu {
  border-right: none;
}
.app-layout .el-main {
  padding: 20px;
  background-color: #181a1b;
  display: flex;
  flex-direction: column;
}
.app-layout .toolbar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  right: 20px;
}

.app-layout .logo {
  margin: 20px;
  color: #fff;
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 2px;
  user-select: none;
}

.logout-button {
  margin: auto 20px 20px;
  font-size: 18px;
  line-height: 24px;
  color: #fff;
  padding: 0;
}

.logout-button span {
  font-size: 14px;
}
</style>
