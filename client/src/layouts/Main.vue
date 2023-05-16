<script lang="ts" setup>
import { Document, Menu as IconMenu } from '@element-plus/icons-vue'
</script>

<template>
  <el-container class="app-layout">
    <el-aside width="200px">
      <h2 class="logo">Gertrude</h2>
      <el-menu default-active="1" class="el-menu-vertical-demo" router>
        <el-menu-item index="1" route="chat">
          <el-icon><document /></el-icon>
          <span>Chat</span>
        </el-menu-item>
        <el-menu-item index="2" route="admin">
          <el-icon><icon-menu /></el-icon>
          <span>Admin Panel</span>
        </el-menu-item>
      </el-menu>
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
  color: #c9c4bd;
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 2px;
  user-select: none;
}
</style>
