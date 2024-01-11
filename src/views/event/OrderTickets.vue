<template>
  <div class="">
    <te-header type="not_login"></te-header>
    <form @submit.prevent="createOrder" class="p-4">
      <div class="d-flex justify-content-between align-item-center flex-wrap flex-md-nowrap">
        <div class="fs-6 mt-2 mt-md-5">
          {{ $store.state.event.venue.title }}<br>
          <div class="bold h2 w-fit pt-1">{{ $store.state.event.title }}</div>
          <div class="mt-md-3 pt-md-1">
            <icon icon="lets-icons:date-today-duotone" class="fs-4 text-primary" />
            {{ new Date($store.state.event.start).toDateString() }}
          </div>
        </div>
        <div class="col-12 col-md-5">
          <Carousel :value="$store.state.event.files" :numVisible="1" :numScroll="1" class="w-100" contentClass="text-center">
            <template #item="e">
              <div class="w-100">
                <Image :src="e.data" imageClass="w-100 rounded-7 w-100 mt-4 mt-md-0" preview />
              </div>
            </template>
          </Carousel>
        </div>
      </div>

      <div class="pt-5">
        <div class="text-primary fw-bold btn mb-2 bg-whitesmoke" @click="showArrangement = true">
          View seat arrangements
        </div><br>
        <span class="">
          {{ $store.state.event.description }}
        </span>
      </div>

      <div class="border my-3 p-3 rounded-7">
        <h5 class="bold">Tickets</h5>
        <div class="mt-3" v-for="tick in $store.state.ticket_levels">
          {{ tick.title }} : {{ $te.currency + tick.price }}<br>
          <InputNumber class="mt-1" v-model="items[tick.id]" inputId="horizontal-buttons" showButtons
            buttonLayout="horizontal" :step="1" decrementButtonClass="p-button-danger bg-danger"
            incrementButtonClass="p-button-success bg-success" incrementButtonIcon="pi pi-plus"
            decrementButtonIcon="pi pi-minus" />
        </div>

        <div class="" @submit="createOrder">
          <h5 class="bold mt-4">Contact Details</h5>
          <div class="d-flex flex-wrap flex-sm-nowrap mt-2">
            <div class="w-100">
              <label class="fw-bold text-muted">First name</label><br>
              <input type="text" required placeholder="Input your first name" v-model="user.first_name"
                class="p-2 mb-2 rounded-7 border w-100" />
            </div>
            <div class="w-100 ms-sm-3">
              <label class="fw-bold text-muted">Last name</label><br>
              <input type="text" required placeholder="Input your last name" v-model="user.last_name"
                class="p-2 mb-2 rounded-7 border w-100" />
            </div>
          </div>
          <div class="d-flex flex-wrap flex-sm-nowrap">
            <div class="w-100">
              <label class="fw-bold text-muted">Email</label><br>
              <input type="text" required placeholder="Input your email" v-model="user.email"
                class="p-2 mb-2 rounded-7 border w-100" />
            </div>
            <div class="w-100 ms-sm-3">
              <label class="fw-bold text-muted">Phone</label><br>
              <input type="text" required placeholder="Input your phone" v-model="user.phone"
                class="p-2 mb-2 rounded-7 border w-100" />
            </div>
          </div>
        </div>

        <div class="mt-4">
          <span class="bold">Total: {{ $te.currency }}{{ totalOrder }}</span><br>
          <button class="btn btn-primary small mt-3" type="submit" :disabled="!totalOrder">
            Proceed to Payment
          </button>
        </div>
      </div>
    </form>

    <Dialog v-model:visible="showArrangement" class="w-100 w-lg-75 mx-5">
      <venue-builder :disabled="true" v-model="$store.state.event.venue.venue_setting"></venue-builder>
    </Dialog>
  </div>
</template>

<script setup>
import InputNumber from "primevue/inputnumber";
import Carousel from "primevue/carousel"
import Image from 'primevue/image';
import ConfirmPopup from 'primevue/confirmpopup';
import Dialog from "primevue/dialog"
import VenueBuilder from "@/components/VenueBuilder.vue";

</script>

<script>
import moment from "moment-timezone"
import {mapActions} from "vuex"

export default {
  name: 'HomeView',
  components: {
  },
  data() {
    const zones = moment.tz.names();
    return {
      event: {
        title: "",
        description: ""
      },
      venue: {},
      files: [],
      value: "",
      user: {},
      items: {

      },
      showArrangement: false
    }
  },
  computed: {
    totalOrder() {
      return Object.values(this.items).reduce((e, a, i) =>
        e + a * this.$store.state.ticket_levels[i].price, 0)
    },
    
  },
  methods: {
    async createOrder() {
      if (!this.totalOrder)
        return
      
      this.$widget.openLoading()
      const res  = await this.createOrderService({
        event_id: this.$route.params.id,
        items:this.items,
        ...this.user
      }) 
      if(!res.success){
        this.$toast.error(this.$widget.getErrors(res.errorMessages) ?? 'Could not create Order')
      }
      if(res.success){
        this.$router.push("/order/completed")
      }
      this.$widget.dismiss()
    },
    ...mapActions(["createOrderService"])
  },
  watch: {

  },
  async created() {
    await this.$store.dispatch('getSingleEventService', this.$route.params.id)
    await this.$store.dispatch('getTicketLevelService', this.$route.params.id)
    // await this.$store.dispatch('getTicketLevelService', this.$route.params.id)
  }
}
</script>

<style>
button.p-image-action.p-link {
  color: white;
  background-color: #77777777;
}

.p-image-toolbar {
  z-index: 999999;
}</style>