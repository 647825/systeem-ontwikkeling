
<template>
  <div class="user-management">
    <button @click="navigateTo('signup')">Add User</button>
    <div class="filters">
      <input
        v-model="searchQuery"
        @input="fetchUsers"
        placeholder="Search users..."
        class="search-input"
      />
      <select v-model="filterRole" @change="fetchUsers" class="role-select">
        <option value="">All Roles</option>
        <option value="0">User</option>
        <option value="1">Employee</option>
        <option value="2">Admin</option>
      </select>
      <select v-model="sortOrder" @change="fetchUsers" class="sort-select">
        <option value="ASC">Ascending</option>
        <option value="DESC">Descending</option>
      </select>
    </div>

    <table class="users-table">
      <thead>
        <tr>
          <!-- setSortField doet nog niks-->
          <th @click="setSortField('email')">Email</th>
          <th @click="setSortField('role')">Role</th>
          <th @click="setSortField('createDate')">Created At</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id">
          <td>
            <input type="email" v-model="user.email" required />
          </td>
          <td>
            <select v-model="user.role" required>
              <option value="0">User</option>
              <option value="1">Employee</option>
              <option value="2">Admin</option>
            </select>
          </td>
          <td>{{ user.createDate }}</td>
          <td>
            <button @click="saveUser(user)" class="button edit">Save</button>
            <button @click="deleteUser(user.id)" class="button delete">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from '../../../axios-auth'
import { requestHeader } from '@/helpers/requestHeader.js'

export default {
  data() {
    return {
      users: [],
      searchQuery: '',
      filterRole: '',
      sortField: 'email',
      sortOrder: 'ASC',
      isAdminAdd: this.$route.query.adminAdd
    }
  },

  methods: {
    setSortField(field) {
      if (this.sortField === field) {
        this.sortOrder = this.sortOrder === 'ASC' ? 'DESC' : 'ASC'
      } else {
        this.sortField = field
        this.sortOrder = 'ASC'
      }
      this.fetchUsers()
    },
    fetchUsers() {
      axios
        .get('/users', {
          params: {
            searchEmail: this.searchQuery,
            filterRole: this.filterRole === '' ? null : this.filterRole,
            sortOrder: this.sortOrder
          },
          headers: requestHeader()
        })
        .then((response) => {
          this.users = response.data
        })
        .catch((error) => {
          console.error('There was an error fetching the users:', error)
        })
    },
    deleteUser(userId) {
      if (confirm('Are you sure you want to delete this user?')) {
        axios
          .delete(`/users/${userId}`, {
            headers: requestHeader()
          })
          .then(() => {
            this.users = this.users.filter((user) => user.id !== userId)
          })
          .catch((error) => {
            console.error('There was an error deleting the user:', error)
          })
      }
    },
    navigateTo(routeName, queryParams = {}) {
      this.$router.push({ name: routeName, query: queryParams })
    },
    saveUser(user) {
      axios
        .put(`/users`, user, {
          headers: requestHeader()
        })
        .catch((error) => {
          console.error('There was an error saving the user:', error)
        })
    }
  },
  mounted() {
    this.fetchUsers()
  }
}
</script>
