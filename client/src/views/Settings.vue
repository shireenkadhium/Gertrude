<script>
import { Delete } from '@element-plus/icons-vue'
import api from '@/services/api'
import { ElNotification } from 'element-plus'

export default {
  components: {
    Delete
  },
  data() {
    return {
      currentKey: '',
      form: {
        apiKey: ''
      },
      settingsRules: [{ required: true, message: 'Please enter API key', trigger: 'blur' }]
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    async submitForm() {
      this.$refs.settingsForm.validate(async (valid) => {
        if (valid) {
          try {
            this.currentKey = this.form.apiKey
            this.form = {
              apiKey: ''
            }
            await api.setApiKey({ value: this.currentKey })
          } catch (err) {
            console.log(err)
            ElNotification({
              title: 'Error',
              message: 'Error setting API key',
              type: 'error'
            })
          }
        }
      })
    },
    async getData() {
      try {
        const { value } = await api.getApiKey()
        this.currentKey = value
        this.form.apiKey = value
      } catch (err) {
        console.log(err)
      }
    },
    async deleteExistingKey() {
      try {
        await api.deleteApiKey()
        this.currentKey = ''
        this.form.apiKey = ''
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>

<template>
  <div>
    <h1>Settings</h1>
    <div v-if="currentKey" class="existing-key">
      <h5>Existing OpenApi Key</h5>
      <div class="key">
        <strong>{{ currentKey }}</strong>
        <el-button type="danger" @click.prevent="deleteExistingKey">
          <el-icon>
            <delete />
          </el-icon>
          <span>Delete</span>
        </el-button>
      </div>
    </div>
    <el-form
      v-if="!currentKey"
      ref="settingsForm"
      :model="form"
      @submit.native.prevent="submitForm"
      label-position="top"
    >
      <el-form-item prop="apiKey" label="New OpenApi Key" :rules="settingsRules">
        <el-input v-model="form.apiKey" placeholder="Enter openapi key"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">Submit</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<style scoped>
.el-form {
  max-width: 500px;
  margin: auto;
  display: flex;
  width: 100%;
  align-items: flex-end;
  gap: 20px;
}

.el-form .el-form-item:first-child {
  flex: 1;
}

.existing-key {
  max-width: 700px;
  color: #fff;
  margin: auto;
}

h1 {
  text-align: center;
  margin: 0 20px 40px;
  color: #fff;
}

h5 {
  font-size: 14px;
  line-height: 22px;
  margin-bottom: 8px;
  color: var(--el-text-color-regular);
}

.key {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.key strong {
  font-size: 18px;
  color: #fff;
}

.existing-key button {
  color: #fff;
}
</style>
