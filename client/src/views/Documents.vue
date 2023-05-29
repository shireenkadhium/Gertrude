<script>
import api from '@/services/api'
import { ElNotification } from 'element-plus'
import { useIndexesStore } from '@/store/indexes.store'

const store = useIndexesStore()
export default {
  data() {
    return {
      form: {
        title: '',
        fileList: []
      },
      filesUploading: false,
      indexQuerying: false,
      fileRules: [
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
            const chat = await store.createIndex(formData)
            console.log(2222, chat)
            const id = chat.id
            this.form.fileList = []
            this.form.title = ''
            this.$router.push(`/chat/${id}`)
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
    }
  }
}
</script>

<template>
  <div class="form-wrapper">
    <div class="upload-form">
      <h2>Select & Upload files to create a chat</h2>
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
        <el-button
          class="upload-btn"
          size="large"
          type="primary"
          native-type="submit"
          @click.prevent="submitForm"
          :disabled="filesUploading"
        >
          {{ filesUploading ? 'Creating chat..' : 'Upload Files' }}
        </el-button>
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
}

.upload-btn {
  width: 100%;
  margin-top: 20px;
}

.file-uploader {
  width: 100%;
}

.form-wrapper {
  width: 100%;
  max-width: 800px;
  padding: 20px;
  border-radius: 5px;
  margin: 0 auto 20px;
}
</style>
