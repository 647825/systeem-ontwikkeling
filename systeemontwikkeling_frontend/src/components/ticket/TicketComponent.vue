
<template>
  <div class="shopping-cart-item" :style="{ backgroundColor: getBackgroundColor() }">
    <div class="overlay" v-if="agendaItem">
      <div class="content">
        <div class="top-section">
          <div class="date-time">{{ formattedDateTime() }}</div>
          <div class="item-name">{{ agendaItem.eventName }}</div>
        </div>
        <div class="middle-section">
          <div class="price">Price: €{{ agendaItem.price }}</div>
          <div class="checkbox-container">
            <input type="checkbox" id="payNow" v-model="payNow" />
            <label for="payNow">Pay Now</label>
          </div>
        </div>
        <div class="comment-options" v-if="agendaItem.event === 'yummy'">
            <label for="comment">Comment for Restaurant:</label>
            <input type="text" id="comment" v-model="comment"/>
          </div>
        <div class="bottom-section">
          <div class="ticket-count" v-if="agendaItem.quantity > 0">
            <button @click="removeTicket" class="subtract">-</button>
            <div>{{ agendaItem.quantity }}</div>
            <button @click="addTicket" class="add">+</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useTicketsStore } from '../../stores/tickets'
import { formattedDate } from '@/helpers/formatDate'

export default {
  props: {
    agendaItem: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      tickets: 0,
      payNow: false,
      colors: {
        history: '#c1d1c1',
        jazz: '#754720',
        dance: '#000080',
        yummy: '#445a59',
        default: '#011b2c'
      },
      comment: ''
    }
  },
  watch: {
    comment(newComment) {
      this.$emit('commentUpdated', { id: this.agendaItem.id, comment: newComment });
    }
  },
  methods: {
    getBackgroundColor() {
      return this.colors[this.agendaItem.event] || this.colors.default
    },
    addTicket() {
      if (this.tickets < this.agendaItem.ticket_amount) {
        this.addTicketStore(this.agendaItem)
        this.tickets = this.getTickets(this.agendaItem.id)
        this.$emit('ticketAdded', this.agendaItem);
      }
    },
    removeTicket() {
      if (this.tickets > 0) {
        this.removeTicketStore(this.agendaItem)
        this.tickets = this.getTickets(this.agendaItem.id)
        this.$emit('ticketRemoved' , this.agendaItem)
      }
    },
    formattedDateTime() {
      const startTime = formattedDate(new Date(this.agendaItem.startTime))
      const endTime = this.agendaItem.endTime
        ? formattedDate(new Date(this.agendaItem.endTime))
        : ''
      return `${startTime} - ${endTime}`
    }
  },
  mounted() {
    const ticketStore = useTicketsStore()
    this.addTicketStore = ticketStore.addTicket
    this.getTickets = ticketStore.getTicketById
    this.removeTicketStore = ticketStore.removeTicket
    this.tickets = this.getTickets(this.agendaItem.id)
  }
}
</script>

<style scoped>
@import './ticket.scss'
</style>
