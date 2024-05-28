<template>
  <div class="management">
    <h1>{{ eventName }} Events</h1>
    <button @click="addEvent" class="button edit">Add Event</button>
    <table>
      <thead>
        <tr>
          <th>Title</th>
          <th>Event type</th>
          <th>Location</th>
          <th>Start Time</th>
          <th>End Time</th>
          <th>Price</th>
          <th>Ticket Amount</th>
          <th>Page</th>
          <th>Detail Page</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="event in events" :key="event.id">
          <td>
            <input type="text" v-model="event.title" required>
          </td>
          <td>
            <select v-model="event.eventType" required>
              <option value="1">Jazz</option>
              <option value="2">History</option>
              <option value="3">Yummy</option>
              <option value="4">Dance</option>
            </select>
          </td>
          <td>
            <input type="text" v-model="event.location" required>
          </td>
          <td>
            <input type="datetime-local" v-model="event.startTime" required>
          </td>
          <td>
            <input type="datetime-local" v-model="event.endTime" required>
          </td>
          <td>
            <input type="number" v-model="event.price" required min="0">  
          </td>
          <td>
            <input type="number" v-model="event.ticket_amount" required min="0">
          </td>
          <td>
            <select v-model="event.page_id" required>
              <option :value="null">no page</option>
              <option v-for="page in pages" :key="page.id" :value="page.id">{{ page.name }}</option>
            </select> 
          </td>
          <td>
            <select v-model="event.detail_page_id" required>
              <option :value="null">no detail page</option>
              <option v-for="detail_page in detail_pages" :key="detail_page.id" :value="detail_page.id">{{ detail_page.name }}</option>
            </select>
          </td>

          <td>
            <button @click="saveEvent(event)" class="button edit">save</button>
            <button @click="deleteEvent(event.id)" class="button delete">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import axios from '../../../axios-auth.js'
import { requestHeader } from '@/helpers/requestHeader'

export default {
  props: ['eventType'],
  data() {
    return {
      events: [],
      pages: [],
      detail_pages: []
    }
  },
  mounted() {
    axios.get('/pages/ids')
      .then(response => {
        this.pages = response.data
      })
      .catch(error => {
        console.error('Failed to fetch pages:', error)
      })
      axios.get('/pages/detail/ids').then(response => {
        this.detail_pages = response.data
      })
  }
  ,
  computed: {
    eventName() {
      const eventTypeNames = {
        1: 'Jazz',
        2: 'History',
        3: 'Yummy',
        4: 'Dance'
      }
      return eventTypeNames[this.eventType] || 'Unknown'
    }
  },
  watch: {
    eventType: {
      immediate: true,
      handler() {
        this.fetchEvents()
      }
    }
  },
  methods: {
    async fetchEvents() {
      axios.get(`/events/${this.eventType}`)
        .then(response => {
          this.events = response.data
        })
        .catch(error => {
          console.error('Failed to fetch events:', error)
        })
    },
    addEvent() {
      this.events.push({
        title: '',
        eventType: this.eventType,
        location: '',
        startTime: new Date().toISOString().slice(0, 16),
        endTime: new Date().toISOString().slice(0, 16),
        price: 0,
        ticket_amount: 0,
        page_id: this.eventType || null,
        detail_page_id: null
      })
    },
    async saveEvent(event) {
      if (!event) {
        console.error('Event not found')
        return
      }
      try {
        if (event.id) {
          axios.put(`/events/${event.id}`, event,
            { headers: requestHeader() })
        } else {
          axios.post('/events', event, 
            { headers: requestHeader() }
          ).then((response) => {
            event.id = response.data.id
          })
        }
      } catch (error) {
        console.error('Failed to save event:', error)
        alert('There was a problem saving the event. Please try again later.')
      }
    },
    async deleteEvent(eventId) {
      if (!eventId) {
        this.events.pop(this.events.find(event => !event.id));
        return;
      }
      if (confirm('Are you sure you want to delete this event? This cannot be undone.')) {
        try {
          await axios.delete(`/events/${eventId}`, 
            { headers: requestHeader() }
          ).then(() => {
            this.events.pop(this.events.find(event => event.id === eventId));
          })
        } catch (error) {
          console.error('Failed to delete event:', error);
          alert('There was a problem deleting the event. Please try again later.');
        }
      }
    }
  }
}
</script>
