
<template>
  <bannerComponent :title="pageData.name" :description="pageData.intro" :image="pageData.picture" />
  <h2>Sights</h2>
  <section id="cards">
    <CardComponent
      v-for="card in pageData.cards"
      :key="card.name"
      :title="card.title"
      :description="card.text"
      :image="card.picture"
      event="history"
      :redirect_link="card.redirect_link"
    />
  </section>
  <h2>Book Your Journey</h2>
  <AgendaComponent :agendaItems="events" />
</template>
<script setup>
import bannerComponent from '@/components/banner/bannerComponent.vue'
import CardComponent from '@/components/card/CardComponent.vue'
import AgendaComponent from '@/components/agenda/AgendaComponent.vue'
import axios from '../../axios-auth.js'
import { Event } from '@/models/event'
</script>
<script>
export default {
  components: {
    bannerComponent,
    CardComponent,
    AgendaComponent
  },
  data() {
    return {
      pageData: {},
      events: []
    }
  },
  mounted() {
    axios
      .get(`/pages/2`)
      .then((response) => {
        this.pageData = response.data
        this.pageData.events.forEach((event) => {
          this.events.push(
            new Event(
              event.id,
              event.title,
              event.location,
              event.startTime,
              event.endTime,
              event.price,
              event.ticket_amount,
              event.eventType
            )
          )
        })
      })
      .catch((error) => {
        console.error(error)
      })
  }
}
</script>
<style scoped>
@import './history.scss';
</style>
