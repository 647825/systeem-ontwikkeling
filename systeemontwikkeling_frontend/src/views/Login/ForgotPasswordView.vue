
<template>
  <div>
    <h2 class="header">Password Reset</h2>
    <form @submit.prevent="resetPassword" class="login-form">
      <label for="email">Email:</label>
      <input type="email" id="email" v-model="email" required placeholder="Enter your email">
      <button type="submit" class="login-button">Send Reset Link</button>
    </form>
    <p>{{ message }}</p>
  </div>
</template>

<script>
import axios from '../../axios-auth.js';

export default {
  data() {
    return {
      email: '',
      message: ''
    };
  },
  methods: {
    resetPassword() {
      axios.post('/users/resetlink', { email: this.email })
        .then(response => {
          this.message = response.data.message;
        })
        .catch(error => {
          this.message = error.response.data.message;
        });
    }
  },
};
</script>
