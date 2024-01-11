<template>
    <ion-page>
        <ion-header :translucent="true">
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-back-button mode="md" defaultHref="/scan" @click="goBack"></ion-back-button>
                </ion-buttons>
                <ion-title>Scanning Completed</ion-title>
            </ion-toolbar>
        </ion-header>

        <ion-content :fullscreen="true">
            <div class="w-100 py-5 d-flex justify-content-center h-100"
                :style="`background-color:${ticket.is_valid ? 'rgb(18, 201, 18)' : 'red'}`">
                <div class="text-white mt-2 w-100">
                    <div class="fs-4 fw-bold w-100 text-center"> {{ ticket.page_name }} </div><br>
                    <div class=" d-flex justify-content-center flex-wrap w-100 mt-3">
                        <icon icon="simple-line-icons:check" width="100" class="text-white" />
                        <div class="mt-4 w-100 text-center">
                            <audio ref="audio">
                                <source src="../assets/Buzz.mp3" type="audio/mpeg" class="" autoplay>
                            </audio>
                            <span class="fs-4 my-1" v-if="ticket.is_valid">
                                Valid Ticket
                            </span>

                            <span class="fs-4 my-1" v-else>
                                InValid Ticket
                            </span><br>
                            <span class="my-2">
                                {{ ticket.first_name }} {{ ticket.last_name }}<br>
                                {{ ticket.id }}
                            </span><br />
                        </div>
                        <div class="w-100 bg-white my-5" style="min-width: 100vvw ;min-height: 2px;"> </div>
                        <div class="p-2">
                            <!-- <div class="px-5 p-2 d-flex align-items-center justify-content-center bg-white text-danger text-uppercase btn fw-bold"
                                style="border-radius: 20px;" v-if="!ticket.is_valid">
                                <icon icon="fa:cancel" class="me-1"></icon> Not Checked-in!
                            </div> -->
                            <div class="px-5 p-2 d-flex align-items-center justify-content-center bg-white text-success text-uppercase btn fw-bold"
                                style="border-radius: 20px;" v-if="ticket.is_valid">
                                <icon icon="fa:check" class="me-1"></icon> Checked-in
                            </div>
                            <div v-if="ticket.is_valid" @click="modal.isOpen = true"
                                class="px-5 mt-2 p-2 d-flex align-items-center justify-content-center bg-success text-white text-uppercase btn fw-bold"
                                style="border-radius: 20px;">
                                View details
                            </div>
                            <div v-else
                                class="px-5 mt-2 p-2 d-flex align-items-center justify-content-center bg-success text-white text-uppercase btn fw-bold"
                                style="border-radius: 20px;">
                                View details
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <ion-modal :isOpen="modal.isOpen" :initial-breakpoint="0.5" :breakpoints="[0.5, 0.7, 1]"
                @didDismiss="modal.isOpen = false">
                <div class="p-5 bg-white h-100">
                    <ticket-display :ticket="ticket" v-if="ticket.is_valid"></ticket-display>
                </div>
            </ion-modal>
        </ion-content>
    </ion-page>
</template>
  
<script setup >
import { IonContent, IonHeader, IonPage, IonTitle, IonModal, IonToolbar, IonButtons, IonBackButton, IonText } from '@ionic/vue';
import { Icon } from "@iconify/vue"
import TicketDisplay from "@/components/Ticket.vue"

</script>
  
<script >
import { defineComponent } from 'vue';

export default defineComponent({
    data() {
        return {
            ticket: {},
            modal: {
                isOpen: false
            }
        }
    },
    methods: {
        goBack() {
            location.href = this.$url + 'scan'
        }
    },
    created() {
        let ticket = this.$store.state.scannedTicket
        console.log(ticket, "TIcket is set")

        if (!ticket.id) {
            location.href = this.$url + 'scan'
            console.log("Ticket is not set")
            return
        }

        // if(ticket.is_scanned) {
        //     ticket.is_valid = false
        // }
        
        this.$store.dispatch('updateTicketHistory', ticket)
        this.ticket = this.$store.state.scannedTicket
    },
    mounted() {
    }
})
</script>

<style></style>

<style scoped></style>