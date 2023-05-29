<script>
import api from '@/services/api'
import { ElNotification } from 'element-plus'
import { useIndexesStore } from '@/store/indexes.store'

const store = useIndexesStore()

export default {
  props: ['id'],
  data() {
    return {
      indexes: [],
      messages: [],
      generating: false,
      newMessage: {
        content: '',
        type: 'outgoing'
      }
    }
  },
  watch: {
    $route(to, from) {
      this.messages = []
      this.generating = false
      this.newMessage.content = ''
    }
  },
  methods: {
    async getIndexes() {
      try {
        this.indexes = await api.getDocumentsIndexes()
      } catch (err) {
        console.log(err)
        ElNotification({
          title: 'Error',
          message: 'There was an error fetching indexes',
          type: 'error'
        })
      }
    },
    async sendMessage() {
      if (this.newMessage.content) {
        const prompt = this.newMessage.content
        this.messages.push({ content: this.newMessage.content, type: 'outgoing' })
        this.newMessage.content = ''
        try {
          this.generating = true
          const id = this.$route.params.id
          const params = {
            params: { prompt },
            id
          }
          await api.getAnswer(params).then((res) => {
            this.messages.push({ content: res.answer, type: 'incoming' })
          })
        } catch (error) {
          const message = error.response?.data?.message || 'There was an error generating answer'
          ElNotification({
            title: 'Error',
            message,
            type: 'error'
          })
        } finally {
          this.generating = false
        }
      }
    },
    submitMessage(event) {
      if (event.keyCode === 13) {
        this.sendMessage()
      }
    }
  }
}
</script>

<template>
  <div class="chat-page">
    <div class="messages">
      <ul>
        <li v-for="(message, index) in messages" :key="index" :class="message.type">
          <span>{{ message.content }}</span>
        </li>
      </ul>
    </div>
    <div class="form-wrapper">
      <el-form class="form" :model="newMessage" @keyup.prevent="submitMessage">
        <div class="fake-input" v-if="generating">
          <div class="lds-facebook">
            <div></div>
            <div></div>
            <div></div>
          </div>
          <span>Generating..</span>
        </div>
        <el-form-item v-if="!generating">
          <el-input
            v-model="newMessage.content"
            type="textarea"
            autosize
            resize="none"
            size="large"
            placeholder="Type your message..."
            @keydown.enter.native="sendMessage"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" native-type="submit" :disabled="generating">Send</el-button>
        </el-form-item>
      </el-form>
    </div>
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

.fake-input {
  display: flex;
  align-items: center;
  width: 100%;
  padding: 2px 11px;
  line-height: 19px;
  border-radius: 5px;
  color: #cfd3dc;
  margin-right: 10px;
  height: 31px;
  gap: 10px;
  font-size: 14px;
  border: 1px solid mediumpurple;
}

.fake-input span {
  color: #fcf;
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

.lds-facebook {
  display: inline-block;
  position: relative;
  width: 36px;
  height: 40px;
}
.lds-facebook div {
  display: inline-block;
  position: absolute;
  left: 4px;
  width: 6px;
  background: #fcf;
  animation: lds-facebook 1.2s cubic-bezier(0, 0.5, 0.5, 1) infinite;
}
.lds-facebook div:nth-child(1) {
  left: 4px;
  animation-delay: -0.24s;
}
.lds-facebook div:nth-child(2) {
  left: 16px;
  animation-delay: -0.12s;
}
.lds-facebook div:nth-child(3) {
  left: 28px;
  animation-delay: 0;
}
@keyframes lds-facebook {
  0% {
    top: 4px;
    height: 32px;
  }
  50%,
  100% {
    top: 12px;
    height: 16px;
  }
}
</style>
