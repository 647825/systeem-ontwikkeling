
<template>
    <main class="centered-container">
        
        <bannerComponent :description="pageData.intro"/>

        <section class="restaurant-icons-section">
            <img class="restaurant-icon-left" :src="RestaurantOne" alt="Restaurant One image">
            <img class="restaurant-icon-right" :src="RestaurantTwo" alt="Restaurant Two image">
        </section>

        <section class="restaurant-cards-section">
            <CardComponent v-for="card in pageData.cards" :key="card.name" :title="card.title" :description="card.text" :image="card.picture" event="yummy" :redirect_link="card.redirect_link"/>
        </section>

        <section class="homerecipes-icons-section">
            <img class="ingredients-icon" :src="Ingredients" alt="Ingredients image">
            <img class="pan-icon" :src="Pan" alt="Pan image">
        </section>

        <section class="homerecipes-slider-section">
            <Slider :slides="pageData.infoText" />
        </section>

        <AgendaComponent :agendaItems="events" />
    </main>
</template>

<script setup>
import Ingredients from '@/assets/images/Yummy/home/ingredients.svg';
import Pan from '@/assets/images/Yummy/home/pan.svg';
import RestaurantOne from '@/assets/images/Yummy/home/restaurantOne.svg';
import RestaurantTwo from '@/assets/images/Yummy/home/restaurantTwo.svg';
import Slider from '@/components/slider/Slider.vue';
import axios from 'axios';
import bannerComponent from '@/components/banner/bannerComponent.vue';
import CardComponent from '@/components/card/CardComponent.vue';
import AgendaComponent from '@/components/agenda/AgendaComponent.vue';
import { Event } from '@/models/event';
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
        axios.get(`${import.meta.env.VITE_API_URL}/pages/3`)
            .then(response => {
                this.pageData = response.data;
                this.pageData.events.forEach((event) => {
                    this.events.push(new Event(event.id, event.title, event.location, event.startTime, event.endTime, event.price, event.ticket_amount, event.eventType));                
                });
            })
            .catch(error => {
                console.error(error);
            });
    }
}
</script>

<style scoped>
@import url(./yummy.scss);
</style>
