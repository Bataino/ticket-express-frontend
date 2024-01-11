<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button mode="md" defaultHref="/scan"></ion-back-button>
        </ion-buttons>
        <ion-title>Ticket History</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-searchbar mode="ios" animated="true" placeholder="Search" v-model="search"></ion-searchbar>
      <div class="h-75 bg-transparent text-secondary">
        <ion-item-group>
          <ion-item v-for="ticket in tickets" class="py-2" @click="openTicketModal(ticket)">
            <ion-text class="fw-bold text-dark">
              {{ ticket.first_name }} {{ ticket.last_name }}<br>
              <span class="small fw-normal text-sm text-secondary">
                {{ ticket.id }}<br>
                {{ ticket.level }}
              </span>
            </ion-text>

          </ion-item>
        </ion-item-group>
      </div>
      <ion-modal :isOpen="modal.isOpen" :initial-breakpoint="0.5" :breakpoints="[0.5, 0.7, 1]"
        @didDismiss="this.modal.isOpen = false">
        <div class="block p-5 bg-white h-100">
          <ticket-display :ticket="modal.data"></ticket-display>
        </div>
      </ion-modal>
    </ion-content>
  </ion-page>
</template>

<script setup >
import { IonContent, IonHeader, IonPage, IonItemGroup, IonModal, IonSelect, IonSelectOption, IonButtons, IonTitle, IonToolbar, IonSearchbar, IonText, IonBackButton } from '@ionic/vue';
import http from "@/services/http.js"
import TicketDisplay from "@/components/Ticket.vue"

</script>

<script >
import { defineComponent } from 'vue';
export default defineComponent({
  data() {
    return {
      tickets: [],
      allTickets: [],
      ticketFilter: "all",
      search: "",
      modal: {
        isOpen: false,
        data: {}
      }
    }
  },
  computed: {
    validTickets() {
      return this.allTickets.filter((elem) => elem.is_valid == 1)
    },
    invalidTickets() {
      return this.allTickets.filter((elem) => elem.is_valid == 0)
    }
  },
  methods: {
    openTicketModal(ticket) {
      this.modal.isOpen = true,
        this.modal.data = ticket
    }
  },
  watch: {
    ticketFilter(filter) {
      switch (filter) {
        case "invalid":
          this.tickets = this.invalidTickets
          break;
        case "valid":
          this.tickets = this.validTickets
          break;
        default:
          this.tickets = this.allTickets
          break;
      }
    },
    search(key) {
      console.log("key", key)
      const results = this.allTickets.filter((ticket) => {
        ticket = Object.values(ticket)
        console.log(ticket)
        let d = ticket.some(ticketKeys => {
          console.log(ticketKeys)
          return String(ticketKeys).toLowerCase().includes(key.toLowerCase())
        })
        console.log(d)
        return d;
      })
      this.tickets = results
    }
  },
  async created() {
    this.allTickets = this.$store.getters.ticketHistory
    this.tickets = this.$store.getters.ticketHistory
  }
})
</script>

<style>
canvas.qrcode-stream-overlay {
  display: none !important;
}

.ion-overlay-wrapper {
  background-color: white !important;
}

.alert-button {
  color: gray !important;
}

.alert-button-role-cancel {
  color: red !important;
}
</style>
