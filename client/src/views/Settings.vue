<script>
import { Delete } from '@element-plus/icons-vue'
export default {
  components: {
    Delete
  },
  data() {
    return {
      currentKey: '213123 123 13 123 ',
      formData: {
        apiKey: ''
      }
    }
  },
  methods: {
    submitForm() {
      this.currentKey = this.formData.apiKey
      this.formData = {
        apiKey: ''
      }
    },
    deleteExistingKey() {
      this.currentKey = ''
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
          <el-icon><delete /></el-icon>
          <span>Delete</span>
        </el-button>
      </div>
    </div>
    <el-form
      v-if="!currentKey"
      :model="formData"
      @submit.native.prevent="submitForm"
      label-position="top"
    >
      <el-form-item label="New OpenApi Key">
        <el-input v-model="formData.apiKey" placeholder="Enter openapi key"></el-input>
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
  max-width: 500px;
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
