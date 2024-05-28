import { defineStore } from "pinia";


export const useTicketsStore = defineStore('tickets',  {
    state: () => ({
        tickets: JSON.parse(localStorage.getItem('tickets')) ?? []
    }),
    actions: {
        addTicket(ticket) {
            this.tickets.push(ticket);
            localStorage.setItem('tickets', JSON.stringify(this.tickets));
        },
        removeTicket(ticket) {
            this.tickets.splice(this.tickets.indexOf(ticket), 1);
            localStorage.setItem('tickets', JSON.stringify(this.tickets));
        },
        getTicketById(id) {

            return this.tickets.filter(t => t.id === id).length || 0;
        },
        clearTickets() {
            this.tickets = [];
            localStorage.setItem('tickets', JSON.stringify(this.tickets));
        }
    }
});
