<template class="">
  <h1>Llama-index Demo</h1>
  <div class="form-wrapper">
    <div class="upload-form" v-if="!filesUploaded">
      <h2>Step 1: Select files</h2>
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
    <div v-else class="query-form">
      <h2>Step 2: Query Index</h2>
      <el-form label-position="top">
        <el-form-item label="What are you interested in?">
          <el-input type="textarea" v-model="text"></el-input>
        </el-form-item>
      </el-form>
      <el-button size="large" type="primary" @click="submitForm">Ask</el-button>
    </div>
  </div>
  <div class="answer" v-if="answer">
    <h2>Answer</h2>
    <p>{{ answer }}</p>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'LlamaIndex',
  data() {
    return {
      filesUploaded: false,
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
        await axios.post('http://localhost:3000/llama-index/create', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        this.fileList = []
        this.filesUploaded = true
      } catch (error) {
        console.log(error)
      } finally {
        this.filesUploading = false
      }
    },

    async submitForm() {
      this.indexQuerying = true
      this.answer = ''
      try {
        const res = await axios.get('http://localhost:3000/llama-index/query', {
          params: {
            prompt: this.text
          }
        })

        this.answer = res.data.answer
      } catch (err) {
        console.log(err)
      } finally {
        this.indexQuerying = false
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

.upload-btn {
  margin-top: 20px;
}

.form-wrapper {
  width: 400px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin: 0 0 20px;
}

.answer {
  width: 400px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
}
</style>
