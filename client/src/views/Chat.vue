<script>
export default {
  data() {
    return {
      messages: [],
      newMessage: {
        content: '',
        type: 'outgoing'
      }
    }
  },
  methods: {
    sendMessage() {
      if (this.newMessage.content) {
        this.messages.push({ content: this.newMessage.content, type: 'outgoing' })
        this.newMessage.content = ''
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
      <el-form
        class="form"
        :model="newMessage"
        @keyup.prevent="submitMessage"
        @submit.native.prevent="sendMessage"
      >
        <el-form-item>
          <el-input
            v-model="newMessage.content"
            type="textarea"
            autosize
            resize="none"
            size="large"
            placeholder="Type your message..."
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" native-type="submit">Send</el-button>
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
}

.messages ul {
  list-style-type: none;
  padding: 0;
}

.messages li {
  margin-bottom: 10px;
  padding: 5px 10px;
}

.messages li span {
  padding: 5px 10px;
  border-radius: 5px;
  display: inline-block;
}

.messages li.incoming span {
  border-radius: 5px;
  text-align: left;
}

.messages li.incoming span {
  background-color: mediumpurple;
}

.messages li.outgoing {
  border-radius: 5px;
  text-align: right;
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

.form .el-textarea .el-textarea__inner {
  min-height: 32px;
  max-height: 175px;
  border: 1px solid var(--el-input-focus-border-color);
  box-shadow: none;
  order-radius: 5px;
}

.el-input {
  width: 300px;
}

.el-button {
  margin-left: 10px;
}
</style>
