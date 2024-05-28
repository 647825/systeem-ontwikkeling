
<template>
  <Background :image="backgroundImage" />
    
    <bannerComponent :title="''" :description="pageData.intro" :image="pageData.picture" />

  <div  v-if="pageData.infoText">
    <HomeCard 
      v-for="(infoText, index) in pageData.infoText" 
      :key="infoText.id" 
      :title="infoText.title" 
      :description="infoText.content"
      :image="infoText.picture"
      :textRight="!!(index % 2)"
    />
  </div>
  

  <AgendaComponent :agendaItems="events" />
</template>
<script setup>
import backgroundImage from '@/assets/images/homebanner.png';
import Background from '@/components/background/BackgroundComponent.vue';</script>

<script>
import bannerComponent from '@/components/banner/bannerComponent.vue';
import HomeCard from '@/components/homeCard/HomeCard.vue';
import AgendaComponent from '@/components/agenda/AgendaComponent.vue';
import { Event } from '@/models/event';
import axios from '../../axios-auth';



export default {
  components: {
    bannerComponent,
    Background,
    HomeCard,
    AgendaComponent
  },
  data() {
    return {
      pageData: {},
      events: []
    };
  },
  mounted() {
    axios.get('/pages/0')
      .then(response => {
        this.pageData = response.data;
      })
      axios.get('/events').then(response => {
        this.events = response.data.map(event => new Event(event.id, event.title, event.location, event.startTime, event.endTime, event.price, event.ticket_amount, event.eventType));
      })
  }
};

</script>


<style scoped>
@import './home.scss';
</style>
