
<template>
  <div class="invoice">
    <div class="cart-summary">
      <div class="total-items">
        <p class="label">{{ totalItems }} Items</p>
      </div>
      <div class="subtotal">
        <p class="label">
          Subtotal: <span class="value">€{{ subtotal }}</span>
        </p>
      </div>
      <hr class="separator" />
      <div class="ticket-list">
        <div v-for="ticket in tickets" :key="ticket.id" class="ticket-item">
          <p>{{ ticket.eventName }}: €{{ ticket.price * ticket.quantity }}</p>
        </div>
      </div>
      <div class="total-tax">
        <p class="label">
          Total Tax (9%): <span class="value">€{{ tax.toFixed(2) }}</span>
        </p>
      </div>
      <hr class="separator" />
      <div class="final-price">
        <p class="label">
          Final price (incl. Tax): <span class="value">€{{ finalPrice.toFixed(2) }}</span>
        </p>
      </div>
      <button
        class="checkout-button"
        @click="handleCheckout"
        v-if="authStore.isLoggedIn && filteredTickets.length > 0"
      >
        Continue to Checkout
      </button>
      <button class="login-button" @click="handleLogin" v-else-if="filteredTickets.length > 0">
        Log in to continue to checkout
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed, defineProps, defineEmits } from 'vue'
import { useAuthStore } from '@/stores/auth'
import router from '@/router';
const props = defineProps({
  tickets: Array,
  totalItems: Number,
  subtotal: Number,
  tax: Number,
  finalPrice: Number
})

const emit = defineEmits(['checkout'])
const authStore = useAuthStore()

const filteredTickets = computed(() => {
  return props.tickets
})
const handleCheckout = () => {
  if (authStore.isLoggedIn) {
    emit('checkout')
  } else {
    alert('Please log in to continue to checkout.')
  }
}
const handleLogin = () => {
  router.push('/login')
}
</script>

<style scoped>
@import './invoice.scss';
</style>
