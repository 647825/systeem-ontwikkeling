
<template>
    <bannerComponent :title="pageData.name" :description="pageData.intro" :image="pageData.picture" />

    <section id="cards">
        <CardComponent v-for="card in pageData.cards" :key="card.name" :title="card.title" :description="card.text" :image="card.picture" event="dance" :redirect_link="card.redirect_link"/>
    </section>
  
    <AgendaComponent :agendaItems="events" />
</template>

<script setup>
import bannerComponent from '@/components/banner/bannerComponent.vue';
import CardComponent from '@/components/card/CardComponent.vue';
import AgendaComponent from '@/components/agenda/AgendaComponent.vue';
import axios from '../../axios-auth.js';
import { Event } from '@/models/event';
import { ref } from 'vue';

const pageData = ref({});
const events = ref([]);

axios.get(`/pages/4`)
    .then(response => {
        pageData.value = response.data;
    })
    .catch(error => {
        console.error(error);
    });

axios.get(`/events/4`)
    .then(response => {
        response.data.forEach(event => {
            events.value.push(new Event(event.id, event.title, event.location, event.startTime, event.endTime, event.price, event.ticket_amount, event.eventType));
        });
    })
    .catch(error => {
        console.error(error);
    });
</script>
<style scoped>
@import url(./dance.scss);
</style>
