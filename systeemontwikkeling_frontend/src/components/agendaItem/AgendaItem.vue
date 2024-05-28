
<template>
    <div :class="['agenda-item', agendaItem.event]">
        <div class="info">
            <h3>{{ agendaItem.eventName }}</h3>
            <div class="details">
                <p>{{ agendaItem.location }}</p>
                <p>{{ formattedDate(agendaItem.startTime) }} - {{ formattedDate(agendaItem.endTime) }}</p>
                <p>Price: €{{ agendaItem.price }}</p>
            </div>
        </div>
        <div class="tickets"  v-if="agendaItem.ticket_amount > 0">
            <button @click="removeTicket" class="subtrackt">-</button>
            <div>{{ tickets }}</div>
            <button @click="addTicket" class="add">+</button>
        </div>
        <div class="tickets" v-else>
            Sold out
        </div>
    </div>
</template>


<script>
import { Event } from '../../models/event'
import { useTicketsStore } from '../../stores/tickets'
import { formattedDate } from '@/helpers/formatDate';

export default{
    setup(){
        const ticketStore = useTicketsStore();
        return { 
            addTicketStore: ticketStore.addTicket,
            getTickets: ticketStore.getTicketById,
            removeTicketStore: ticketStore.removeTicket
        };
    },
    props: {
        agendaItem: {
            type: Event,
            required: true
        }
    },
    data() {
        return {
            tickets: 0
        }
    },
    methods: {
        addTicket() {
            if (this.tickets < this.agendaItem.ticket_amount) {
                this.addTicketStore(this.agendaItem);
                this.tickets = this.getTickets(this.agendaItem.id);
            }
        },
        removeTicket() {
            if (this.tickets > 0) {
                this.removeTicketStore(this.agendaItem);
                this.tickets = this.getTickets(this.agendaItem.id);
            }
        },
        formattedDate(time) {
        return formattedDate(time);
    },
    },mounted() {
        this.tickets = this.getTickets(this.agendaItem.id);
    }
}

</script>

<style scoped>
@import './agendaItem.scss';
</style>
