<template>
  <div>
    <div class="section">
      <h2>User List</h2>
      <el-table :data="users" style="width: 100%">
        <el-table-column prop="name" label="Name"></el-table-column>
        <el-table-column prop="email" label="Email"></el-table-column>
        <el-table-column label="Actions">
          <template #default="scope">
            <el-button @click="editUser(scope.row)">Edit</el-button>
            <el-button type="danger" @click="deleteUser(scope.row)">Delete</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div class="section">
      <h2>Create User</h2>
      <el-form :model="newUser" @submit.native.prevent="createUser">
        <el-form-item label="Name">
          <el-input v-model="newUser.name" placeholder="Enter name"></el-input>
        </el-form-item>
        <el-form-item label="Email">
          <el-input v-model="newUser.email" placeholder="Enter email"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" native-type="submit">Create</el-button>
        </el-form-item>
      </el-form>
    </div>

    <el-dialog :visible.sync="editDialogVisible">
      <el-form :model="selectedUser" @submit.native.prevent="saveUser">
        <el-form-item label="Name">
          <el-input v-model="selectedUser.name" placeholder="Enter name"></el-input>
        </el-form-item>
        <el-form-item label="Email">
          <el-input v-model="selectedUser.email" placeholder="Enter email"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" native-type="submit">Save</el-button>
          <el-button type="danger" @click="deleteUser(selectedUser)">Delete</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newUser: {
        name: '',
        email: ''
      },
      users: [
        { id: 1, name: 'John Doe', email: 'john@example.com' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com' }
      ],
      editDialogVisible: false,
      selectedUser: null
    }
  },
  methods: {
    createUser() {
      // Generate a unique ID for the new user
      const newUserId = Math.max(...this.users.map((user) => user.id)) + 1

      // Add the new user to the users array
      this.users.push({
        id: newUserId,
        name: this.newUser.name,
        email: this.newUser.email
      })

      // Reset the form
      this.newUser.name = ''
      this.newUser.email = ''
    },
    editUser(user) {
      // Set the selected user for editing
      this.selectedUser = Object.assign({}, user)

      // Show the edit dialog
      this.editDialogVisible = true
    },
    saveUser() {
      // Find the index of the selected user in the users array
      const userIndex = this.users.findIndex((user) => user.id === this.selectedUser.id)

      if (userIndex > -1) {
        // Update the user in the users array
        this.users[userIndex] = this.selectedUser

        // Close the edit dialog
        this.editDialogVisible = false
      }
    },
    deleteUser(user) {
      // Find the index of the user in the users array
      const userIndex = this.users.findIndex((u) => u.id === user.id)

      if (userIndex > -1) {
        // Remove the user from the users array
        this.users.splice(userIndex, 1)
      }
    }
  }
}
</script>

<style scoped>
.section {
  margin-bottom: 20px;
}
h2 {
  margin-bottom: 10px;
}
</style>
