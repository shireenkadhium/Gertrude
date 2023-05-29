<script>
import api from '@/services/api'
import { ElNotification } from 'element-plus'
import { useIndexesStore } from '@/store/indexes.store'

const store = useIndexesStore()
</script>

<template>
  <div class="chats-page">
    <h1>Select chat on the left</h1>
  </div>
</template>

<style scoped>
.chat-page {
  display: flex;
  flex-direction: column;
  height: 100%;
  color: #fff;
}

.messages {
  flex: 1 1 auto;
  overflow-x: hidden;
  overflow-y: auto;
  padding: 20px;
}

.messages ul {
  list-style-type: none;
  padding: 0;
}

.messages li {
  margin-bottom: 10px;
  padding: 5px 10px;
  max-width: 75%;
}

.messages li span {
  padding: 5px 10px;
  border-radius: 5px;
  display: inline-block;
}

.messages li.incoming {
  margin-right: auto;
  border-radius: 5px;
  text-align: left;
}

.messages li.incoming span {
  background-color: mediumpurple;
}

.messages li.outgoing {
  border-radius: 5px;
  text-align: right;
  margin-left: auto;
}

.messages li.outgoing span {
  background-color: #2a93d5;
}

.form-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  padding: 10px;
}

.el-form {
  width: 100%;
  max-width: 600px;
  display: flex;
  padding: 20px;
  border-radius: 5px;
  //border: 1px solid #919191;
}

.form .el-form-item {
  margin-bottom: 0;
}

.form .el-form-item:first-child {
  flex: 1;
  margin-right: 10px;
}

.form .el-textarea {
  flex: 1;
}

.el-textarea__inner {
  min-height: 32px;
  max-height: 175px;
  border: 1px solid var(--el-input-focus-border-color);
  box-shadow: none;
  border-radius: 5px;
}

.el-input {
  width: 300px;
}

.el-button {
  margin-left: 10px;
}
</style>
