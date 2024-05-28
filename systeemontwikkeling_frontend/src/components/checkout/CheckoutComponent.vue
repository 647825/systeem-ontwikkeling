
<template>
  <div class="checkout">
    <div class="input-group">
      <label for="name">Name:</label>
      <input type="text" id="name" v-model="name" placeholder="Enter your name" />
    </div>
    <div class="input-group">
      <label for="email">Email:</label>
      <input type="text" id="email" v-model="email" placeholder="Enter your email" />
    </div>
    <div class="card-element" ref="cardElementContainer"></div>
    <div class="button-container">
      <div v-if="loading" class="loading-container">
        <div class="loading-circle"></div>
      </div>
      <div v-else>
        <button class="cancel-button" @click="cancelCheckout">Cancel</button>
        <button class="checkout-button" @click="redirectToStripe">Checkout</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, defineProps } from 'vue'
import { loadStripe } from '@stripe/stripe-js'
import axios from '../../axios-auth'
import { useRouter } from 'vue-router'
import { useTicketsStore } from '../../stores/tickets'

const name = ref('')
const email = ref('')
const emit = defineEmits(['cancel'])
const router = useRouter()
const loading = ref(false)

let stripe = null
let cardElement = null
const props = defineProps({
  finalPrice: Number,
  tickets: Array
})
let cardElementContainer = ref(null)

onMounted(async () => {
  stripe = await loadStripe(import.meta.env.VITE_VUE_APP_STRIPE_PUBLIC_KEY)
  if (stripe) {
    const elements = stripe.elements()
    cardElement = elements.create('card', {
      style: {
        base: {
          color: '#ffffff' 
        }
      }
    })
    cardElement.mount(cardElementContainer.value)
  }
})

async function redirectToStripe() {
  toggleLoading(true);

  if (!stripe || !cardElement) {
    console.error('Stripe or cardElement is not properly initialized.')
    toggleLoading(false);
    return
  }

  try {
   //Maakt een token aan voor de creditcard
    const { token, error } = await stripe.createToken(cardElement)
    if (error) {
      console.error('Error creating card token:', error)
      toggleLoading(false);
      return
    }
    if (!token) {
      console.error('No token received.')
      toggleLoading(false);
      return
    }
    const amountInCents = Math.round(props.finalPrice * 100)
    const paymentData = {
      amount: amountInCents,
      currency: 'eur',
      payment_method_data: {
        type: 'card',
        card: {
          token: token.id
        }
      },
      email: email.value
    }
    const response = await axios.post('/payment', paymentData)

    if (!response.data.clientSecret) {
      console.error('No client secret received.')
      toggleLoading(false);
      return
    }
    //bevestig de betaling met client secret
    const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
      response.data.clientSecret
    )
    if (confirmError) {
      console.error('Error confirming card payment:', confirmError)
      toggleLoading(false);
      return
    }

    if (paymentIntent.status === 'succeeded') {
      await sendOrder()
      useTicketsStore().clearTickets()
      router.push('/success')
    }
  } catch (error) {
    console.error('Error redirecting to Stripe:', error)
    toggleLoading(false);
  }
}

async function sendOrder() {
  try {
    const userId = localStorage.getItem('userId')
    const formattedTickets = props.tickets.map((ticket) => ({
      id: ticket.id,
      quantity: ticket.quantity,
      comment: ticket.comment
    }))
    const jwtToken = localStorage.getItem('jwt')
    //Voegt de jwt toe aan de headers
    console.log(formattedTickets, jwtToken);
    console.log(userId);
    axios.defaults.headers.common['Authorization'] = `Bearer ${jwtToken}`
    await axios.post('/orders', {
      tickets: formattedTickets,
      userId: userId
    })
  } catch (error) {
    console.error('Error sending tickets:', error)
  }
}

const cancelCheckout = () => {
  emit('cancel')
}

function toggleLoading(value) {
  loading.value = value;
}
</script>

<style scoped>
@import './checkout.scss';
</style>
