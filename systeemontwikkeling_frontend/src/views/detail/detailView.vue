
<template>
    <bannerComponent :title="pageData.name" :description="pageData.intro" :image="pageData.picture" />

    <section id="" v-if="infoText.length > 0">
        <div v-for="info in infoText" :key="info.id" class="infoText">
         <div>
            <h2>{{info.title}}</h2>
            <p>{{info.content}}</p>
         </div>   
            <img v-if="info.picture" :src="info.picture" alt="info.picture" />
        </div>
    </section>

    <section id="cards">
        <CardComponent v-for="card in pageData.cards" :key="card.name" :title="card.title" :description="card.text" :image="card.picture" :event="this.pageData.parentName.toLocaleLowerCase()" :redirect_link="card.redirect_link"/>
    </section>
  
    <AgendaComponent :agendaItems="events" v-if="events.length > 0"/>
  
</template>

<script>
import bannerComponent from '@/components/banner/bannerComponent.vue';
import CardComponent from '@/components/card/CardComponent.vue';
import AgendaComponent from '@/components/agenda/AgendaComponent.vue';
import axios from '../../axios-auth.js';
import { Event } from '@/models/event';
import router from '@/router/index.js';

export default {
    components: {
        bannerComponent,
        CardComponent,
        AgendaComponent
    },
    data() {
        return {
            pageData: {},
            events: [],
            infoText: []
        }
    },
    mounted() {
        axios.get(`/pages/${this.$route.params.id}`)
            .then(response => {
                this.pageData = response.data;
                if (this.$route.params.parentName.toLocaleLowerCase() !== this.pageData.parentName.toLocaleLowerCase()) {
                    router.push('/404');
                }

                this.pageData.infoText.forEach((info) => {
                    this.infoText.push(info);
                })
                this.pageData.events.forEach((event) => {
                    this.events.push(new Event(event.id, event.title, event.location, event.startTime, event.endTime, event.price, event.ticket_amount, event.eventType));                
                })
                this.infoText.forEach((info) => {
                console.log(info);
            });
            console.log(this.pageData);
            })
            .catch(error => {
                console.error(error);
                router.push('/404');
            });
            
    },
}


</script>
<style>
@import 'detail.scss';
</style>

