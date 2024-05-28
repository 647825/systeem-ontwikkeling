<template>
  <div>
    <h2 class="header">Reset Password</h2>
    <form @submit.prevent="resetPassword" class="login-form">
      <label for="password">New Password:</label>
      <input
        type="password"
        id="password"
        v-model="password"
        required
        placeholder="Enter your new password"
        class="input-field"
      />
      <label for="confirm-password">Confirm Password:</label>
      <input
        type="password"
        id="confirm-password"
        v-model="confirmPassword"
        required
        placeholder="Confirm your new password"
        class="input-field"
      />
      <button type="submit" class="login-button">Reset Password</button>
    </form>
  </div>
</template>

<script>
import axios from '../../axios-auth'

export default {
  data() {
    return {
      password: '',
      confirmPassword: '',
      token: ''
    }
  },
  created() {
    this.token = this.$route.query.token;
  },
  methods: {
    resetPassword() {
      if (this.password !== this.confirmPassword) {
        alert('Passwords do not match')
        return
      }

      const payload = {
        password: this.password,
        token: this.token
      };

      axios
        .put('/users/resetpassword', payload)
        .then((response) => {
          alert('Password reset successful')
          this.$router.push('/login')
        })
        .catch((error) => {
          console.error('Password reset error:', error)
          alert('Failed to reset password')
        })
    }
  }
}
</script>

<style scoped>
@import '../../assets/variables.scss';

.header {
  text-align: center;
  margin-bottom: 20px;
}

.login-form {
  width: 25rem;
  padding: 1.25rem;
  border: 0.0625rem solid #ccc;
  border-radius: 1.25em;
  gap: 0.9375rem;
}

.input-field {
  width: 95%;
  padding: 0.625em;
  border: 0.0625rem solid #ccc;
  border-radius: 1.25em;
  background-color: transparent;
  color: white;
  margin: 0 auto;

  &:focus {
    outline: none;
    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
  }
}

.login-button {
  width: 50%;
  padding: 0.625em;
  background-color: $primary-color-login;
  color: white;
  border: none;
  border-radius: 1.25em;
  cursor: pointer;
  display: block;
  margin: 0 auto;

  &:hover {
    background-color: $hover-color-login;
  }
}
</style>