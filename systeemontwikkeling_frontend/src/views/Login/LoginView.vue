
<template>
      <h2 class="header">Login</h2>
      <form @submit.prevent="login" class="login-form">
          <label for="email">Email:</label>
          <input type="email" id="email" v-model="email" required placeholder="Enter your email">
          <label for="password">Password:</label>
          <input type="password" id="password" v-model="password" required placeholder="Enter your password">
          <router-link to="/forget-password" class="forgot-password">Forgot password?</router-link>
        <button type="submit" class="login-button">Login</button>
        <p class="signup-text">Don`t have an account? <router-link to="/signup" class="signup-link">Sign up</router-link></p>
      </form>
</template>
  <script>
  import axios from '../../axios-auth.js';
  import { useAuthStore } from '../../stores/auth.js';
  import requestAccess from '../../helpers/roleCheck.js';
  export default {
    data() {
      return {
        email: '',
        password: '',
      };
    },
    methods: {
      login() {
        axios.post('users/login', {
          email: this.email,
          password: this.password,
        })
          .then((response) => {
            axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.jwt}`;
            const authStore = useAuthStore();
            authStore.login(response.data.jwt, response.data.userId);
            
        requestAccess(2).then((response) => {
          response ? this.$router.push('/admin') : 
          requestAccess(1).then((response) => {
            response ? this.$router.push('/employee') : this.$router.push('/')
          })
        })
          })
          .catch((error) => {
            console.error(error);
            alert('Invalid email or password');
          });
        }
      },
    };
  </script>
  
  <style>
  @import './login.scss';
  </style>
  
