
<template>
  <h2 class="header">Sign Up</h2>
  <form @submit.prevent="signup" class="login-form">
    <label for="username">Username:</label>
    <input
      type="text"
      id="username"
      v-model="username"
      required
      placeholder="Enter your username"
    />

    <label for="email">Email:</label>
    <input type="email" id="email" v-model="email" required placeholder="Enter your email" />

    <label for="password">Password:</label>
    <input
      type="password"
      id="password"
      v-model="password"
      required
      placeholder="Create a password"
    />

    <label for="phone">Phone Number:</label>
    <input type="tel" id="phone" v-model="phone" required placeholder="Enter your phone number" />

    <label for="address">Address:</label>
    <input type="text" id="address" v-model="address" required placeholder="Enter your address" />
    <button type="submit" class="login-button">Sign Up</button>
    <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
    <p v-if="successMessage" class="success-message">{{ successMessage }}</p>
  </form>
</template>

<script>
import axios from '../../axios-auth.js'
import requestAccess from '@/helpers/roleCheck'

export default {
  data() {
    return {
      username: '',
      email: '',
      password: '',
      phone: '',
      address: '',
      role: 0,
      errorMessage: '',
      successMessage: ''
    }
  },
  methods: {
    signup() {
      const signupData = {
        username: this.username,
        email: this.email,
        password: this.password,
        phoneNumber: this.phone,
        address: this.address,
        role: this.role
      }
      if (this.username && this.email && this.password && this.phone && this.address) {
        axios
          .post('users/signUp', signupData)
          .then((response) => {
            if (response.status === 200) {
              requestAccess(2).then((response) => {
                const isAdmin = response
                if (isAdmin) {
                this.$router.push({ name: 'adminUsers' })
              } else {
                this.$router.push('/login')
              }
              })
              
            } else {
              this.errorMessage = 'Signup was not successful. Please try again.'
            }
          })
          .catch((error) => {
            this.errorMessage = 'An error occurred during signup. Please try again.'
            console.error('An error occurred during signup:', error)
          })
      }
    }
  }
}
</script>
