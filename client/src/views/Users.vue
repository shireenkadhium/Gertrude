<template>
  <div>
    <div class="section" v-if="!createMode && !editMode">
      <h2>User List</h2>
      <el-table :data="users" style="width: 100%">
        <el-table-column class-name="column" prop="firstName" label="First Name"></el-table-column>
        <el-table-column class-name="column" prop="lastName" label="Last Name"></el-table-column>
        <el-table-column class-name="column" prop="email" label="Email"></el-table-column>
        <el-table-column class-name="column" label="Actions" width="170px">
          <template #default="scope">
            <el-button @click="editUser(scope.row)">Edit</el-button>
            <el-button type="danger" @click="deleteUser(scope.row)">Delete</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-button class="button" type="primary" @click="createMode = true">Create User</el-button>
    </div>
    <div class="section create-users" v-if="createMode || editMode">
      <h2>{{ createMode ? 'Create' : 'Update' }} User</h2>
      <el-form
        ref="userForm"
        :model="userForm"
        label-position="top"
        @submit.native.prevent="handleSubmit"
      >
        <el-form-item label="Email" prop="email" :rules="emailRules">
          <el-input v-model="userForm.email" placeholder="Enter email"></el-input>
        </el-form-item>
        <el-form-item label="First Name" prop="firstName" :rules="firstNameRules">
          <el-input v-model="userForm.firstName" placeholder="Enter first name"></el-input>
        </el-form-item>
        <el-form-item label="Last Name" prop="lastName" :rules="lastNameRules">
          <el-input v-model="userForm.lastName" placeholder="Enter last name"></el-input>
        </el-form-item>
        <div v-if="editMode" class="update-password">
          <el-checkbox v-model="editPassword" placeholder="Update Password">
            Set new password
          </el-checkbox>
        </div>
        <div class="password-fields" v-if="createMode || editPassword">
          <el-form-item label="Password" prop="password" :rules="passwordRules">
            <el-input
              v-model="userForm.password"
              placeholder="Enter password"
              show-password
            ></el-input>
          </el-form-item>
          <el-form-item
            :rules="passwordConfirmationRules"
            label="Password Confirmation"
            prop="passwordConfirmation"
          >
            <el-input
              v-model="userForm.passwordConfirmation"
              placeholder="Confirm password"
              show-password
            ></el-input>
          </el-form-item>
        </div>
        <el-form-item class="button-holder">
          <el-button native-type="button" @click="cancel">Cancel</el-button>
          <el-button type="primary" native-type="submit">
            {{ createMode ? 'Create' : 'Update' }}
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import api from '@/services/api'
import { ElNotification, ElMessageBox } from 'element-plus'

export default {
  data() {
    return {
      users: [],
      userForm: {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        passwordConfirmation: ''
      },
      emailRules: [
        { required: true, message: 'Please enter your email', trigger: 'blur' },
        { type: 'email', message: 'Invalid email format', trigger: ['blur', 'change'] }
      ],
      firstNameRules: [
        { required: true, message: 'Please enter your First Name', trigger: ['blur', 'change'] }
      ],
      lastNameRules: [
        { required: true, message: 'Please enter your Last Name', trigger: ['blur', 'change'] }
      ],
      passwordRules: [
        { required: true, message: 'Please enter your password', trigger: 'blur' },
        {
          min: 6,
          message: 'Password length should be at least 6 characters',
          trigger: ['blur', 'change']
        }
      ],
      passwordConfirmationRules: [
        { required: true, message: 'Please enter your password', trigger: 'blur' },
        { validator: this.validatePasswordConfirmation, trigger: ['blur', 'change'] }
      ],
      createMode: false,
      editMode: false,
      editPassword: false
    }
  },
  mounted() {
    this.getUsers()
  },
  methods: {
    async getUsers() {
      try {
        this.users = await api.getUsers()
      } catch (error) {
        console.error(error)
        ElNotification({
          title: 'Error',
          message: 'There was an error fetching users',
          type: 'error'
        })
      }
    },
    cancel() {
      this.createMode = false
      this.editMode = false
    },
    async handleSubmit() {
      this.$refs.userForm.validate(async (valid) => {
        if (valid) {
          if (this.createMode) {
            const user = await api.createUser(this.userForm)
            this.users.push(user)
            this.createMode = false
            ElNotification({
              title: 'Success',
              message: 'User created successfully',
              type: 'success'
            })
          } else if (this.editMode) {
            const id = this.userForm.id
            const body = this.userForm
            const user = await api.updateUser({ id, body })
            const userIndex = this.users.findIndex((user) => user.id === id)
            if (userIndex > -1) {
              // Update the user in the users array
              Object.assign(this.users[userIndex], user)
            }
            this.editMode = false
            ElNotification({
              title: 'Success',
              message: 'User updated successfully',
              type: 'success'
            })
          }

          this.userForm.firstName = ''
          this.userForm.lastName = ''
          this.userForm.email = ''
          this.userForm.password = ''
        }
      })
    },
    validatePasswordConfirmation(rule, value, callback) {
      if (value === '') {
        callback(new Error('Please confirm your password'))
      } else if (value !== this.userForm.password) {
        callback(new Error('Passwords do not match'))
      } else {
        callback()
      }
    },
    editUser(user) {
      this.userForm = Object.assign({}, user)
      this.editMode = true
    },
    async deleteUser(user) {
      // Find the index of the user in the users array
      ElMessageBox.confirm(
        `Are you sure you want to delete user (${user.firstName} ${user.lastName})?`,
        'Warning',
        {
          confirmButtonText: 'OK',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }
      ).then(async () => {
        try {
          await api.removeUser(user.id)
          const userIndex = this.users.findIndex((u) => u.id === user.id)
          if (userIndex > -1) {
            this.users.splice(userIndex, 1)
          }
          ElNotification({
            title: 'Success',
            message: 'User has been deleted',
            type: 'success'
          })
        } catch (error) {
          console.error(error)
          ElNotification({
            title: 'Error',
            message: 'There was an error deleting user',
            type: 'error'
          })
        }
      })
    }
  }
}
</script>

<style scoped>
.el-table__header-wrapper .column {
  background-color: transparent !important;
}

.section {
  max-width: 800px;
  margin: 0 auto 20px;
}

.section .button {
  width: 100%;
  margin-top: 20px;
}

.create-users button {
  width: 49%;
}

.button-holder {
  padding-top: 20px;
}

.password-fields {
  padding-top: 20px;
}

.create-users button:last-child {
  margin-left: auto;
}

h2 {
  margin-bottom: 10px;
  color: #fff;
  text-align: center;
}
</style>
