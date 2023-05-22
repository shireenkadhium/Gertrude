<template>
  <div>
    <div class="form-wrapper">
      <div class="upload-form" v-if="!filesUploaded">
        <h2>Select & Upload files to create a chat</h2>
        <div>
          <el-upload
            class="upload-demo"
            drag
            multiple
            action=""
            :disabled="filesUploading"
            :file-list="fileList"
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
        </div>

        <el-button
          class="upload-btn"
          size="large"
          type="primary"
          @click="uploadFiles"
          :disabled="fileList.length === 0 || filesUploading"
        >
          {{ filesUploading ? 'Uploading and creating index..' : 'Upload Files' }}
        </el-button>
      </div>
    </div>
    <div class="answer" v-if="answer">
      <h2>Answer</h2>
      <p>{{ answer }}</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import api from '@/services/api'

export default {
  name: 'LlamaIndex',
  data() {
    return {
      filesUploading: false,
      indexQuerying: false,
      fileList: [],
      text: '',
      answer: ''
    }
  },

  methods: {
    handleChange(file, list) {
      this.fileList = list.map((file) => file.raw)
    },

    beforeUpload(file) {
      this.fileList.push(file)
      return false
    },

    async uploadFiles() {
      this.filesUploading = true
      const formData = new FormData()

      this.fileList.forEach((file) => {
        formData.append('files', file)
      })

      try {
        await api.createDocumentsIndex(formData)
        this.fileList = []
      } catch (error) {
        console.log(error)
      } finally {
        this.filesUploading = false
      }
    }
  }
}
</script>

<style scoped>
.query-form,
.upload-form {
  display: flex;
  flex-direction: column;
}

h2 {
  margin: 0 0 20px;
  color: #fff;
}

.upload-btn {
  margin-top: 20px;
}

.form-wrapper {
  max-width: 800px;
  padding: 20px;
  border-radius: 5px;
  margin: 0 auto 20px;
}
</style>
