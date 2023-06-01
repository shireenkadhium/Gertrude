<script>
import { ElNotification } from 'element-plus'
import { useChatStore } from '@/store/indexes.store'

export default {
  setup() {
    const store = useChatStore()
    return { store }
  },
  data() {
    return {
      form: {
        title: '',
        fileList: []
      },
      filesUploading: false,
      indexQuerying: false,
      createMode: false,
      fileRules: [
        { required: true, message: 'Please select a file', trigger: 'blur' },
        {
          validator: this.validateFiles,
          trigger: ['blur', 'input', 'change']
        }
      ]
    }
  },

  methods: {
    handleChange(file, list) {
      this.form.fileList = list.map((file) => file.raw)
    },

    beforeUpload(file) {
      this.fileList.push(file)
      return false
    },

    validateFiles(rule, value, callback) {
      console.log(value)
      if (value.length === 0) {
        callback(new Error('Please select a file'))
      } else {
        callback()
      }
    },

    async submitForm() {
      this.$refs.documentsForm.validate(async (valid) => {
        console.log(valid)
        if (valid) {
          this.filesUploading = true
          const formData = new FormData()

          const title = this.form.title
          formData.append('title', title)

          this.form.fileList.forEach((file) => {
            formData.append('files[]', file)
          })

          try {
            const chat = await this.store.createChat(formData)
            const id = chat.id
            this.form.fileList = []
            this.form.title = ''
            this.$router.push(`/chat/${id}`)
            ElNotification({
              title: 'Success',
              message: 'Chat created successfully',
              type: 'success'
            })
          } catch (error) {
            console.log(error)
            ElNotification({
              title: 'Error',
              message: error?.response?.data?.message,
              type: 'error'
            })
          } finally {
            this.filesUploading = false
          }
        }
      })
    },
    async deleteChat(chat) {
      try {
        await this.store.deleteChat(chat.id)
        ElNotification({
          title: 'Success',
          message: 'Chat deleted successfully',
          type: 'success'
        })
      } catch (error) {
        const message = error?.response?.data?.message || 'Error deleting chat'
        ElNotification({
          title: 'Error',
          message,
          type: 'error'
        })
      }
    }
  }
}
</script>

<template>
  <div v-if="!createMode && !store.noChats" class="existing-chats">
    <div class="header">
      <h2>Manage Chats</h2>
      <el-button type="primary" @click.prevent="createMode = true">Create Chat</el-button>
    </div>
    <ul class="chat-list">
      <li v-for="chat in store.chats">
        <div class="holder">
          <div class="title">
            <router-link :to="`/chat/${chat.id}`">{{ chat.title }}</router-link>
          </div>
          <div class="actions">
            <el-button type="danger" size="small" @click.prevent="deleteChat(chat)"
              >Delete</el-button
            >
          </div>
        </div>
        <div class="files">
          <span v-for="file in chat.files">
            {{ file }}
          </span>
        </div>
      </li>
    </ul>
  </div>
  <div class="form-wrapper" v-if="createMode || store.noChats">
    <div class="upload-form">
      <h2>Create chat</h2>
      <el-form :model="form" ref="documentsForm" label-position="top">
        <el-form-item label="Chat Name" prop="title" :required="true">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <div>
          <el-form-item label="Context Files" prop="fileList" :rules="fileRules">
            <el-upload
              class="file-uploader"
              drag
              multiple
              action=""
              :disabled="filesUploading"
              :file-list="form.fileList"
              :auto-upload="false"
              :on-change="handleChange"
              :before-upload="beforeUpload"
            >
              <el-icon class="el-icon--upload">
                <upload-filled />
              </el-icon>
              <div class="el-upload__text">Drop files here or <em>click to upload</em></div>
              <template #tip>
                <div class="el-upload__tip">docx, xlsx, pdf, text files are supported</div>
              </template>
            </el-upload>
          </el-form-item>
        </div>
        <div class="buttons">
          <el-button
            class="upload-btn"
            size="large"
            type="default"
            @click.prevent="createMode = false"
          >
            Cancel
          </el-button>
          <el-button
            class="upload-btn"
            size="large"
            type="primary"
            native-type="submit"
            @click.prevent="submitForm"
            :disabled="filesUploading"
          >
            {{ filesUploading ? 'Creating chat..' : 'Create Chat' }}
          </el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<style scoped>
.upload-form {
  display: flex;
  flex-direction: column;
}

h2 {
  margin: 0 0 20px;
  color: #fff;
  text-align: center;
}

.header {
  display: flex;
  justify-content: space-between;
}

.buttons {
  display: flex;
  width: 100%;
}

.upload-btn {
  width: 100%;
  margin-top: 20px;
}

.file-uploader {
  width: 100%;
}

.existing-chats,
.form-wrapper {
  width: 100%;
  max-width: 800px;
  padding: 20px;
  border-radius: 5px;
  margin: 0 auto 20px;
}

.chat-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.chat-list li {
  width: 100%;
  margin-bottom: 20px;
  padding: 10px 15px 15px;
  border: 1px solid #333;
  border-radius: 5px;
}

.chat-list li .holder {
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 5px;
}

.chat-list li .files {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.chat-list .title {
  width: 125px;
  flex-shrink: 0;
}
.chat-list .title a {
  padding: 0 3px;
  border-radius: 5px;
  background: transparent;
  color: #3f9eff;
}

.chat-list .title a:hover {
  color: #fff;
}

.chat-list li span {
  display: inline-block;
  padding: 2px 5px;
  border: 1px solid #092645;
  border-radius: 5px;
  font-size: 12px;
  background: #092645;
  color: #fff;
}
</style>
