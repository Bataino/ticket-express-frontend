<template>
  <div class="">
    <div class="pt-4 px-4 d-flex justify-content-between align-items-center">
      <div class="col-4">
        <img src="@assets/images/logo.jpg" class="w-100" />
      </div>
      <div class="">
        <router-link class="p-2 me-1 px-4" to="/login">
          Login
        </router-link>
        <router-link class="p-2 ms-2 bg-primary border-0 px-4 bg-gradient rounded-20 text-white" to="/signup">
          Signup
        </router-link>
      </div>
    </div>
    <hr />

    <div class="pt-5 px-3">
      <p>
        Don't get taken aback by fees from Eventbrite and Ticketleap
      </p>
      <div class="d-flex flex-wrap flex-md-nowrap ">
        <div class="col-12 col-md-7 border-top">
          <div class="pt-5 pe-3">
            <span class="fs-1 bold text-muted ext-nowrap">
              The No 1 Event Ticketing Software
            </span>
            <br>
            <span class="h1 mt-2 bold text-warning">
              Create an event and start selling in Minutes
            </span>
            <br><br>
            <div class="fs-6">
              <div>
                TicketExpress is designed to make the process simple, customizable, and affordable. Whether you're hosting a festival,
                farm, fair, concert, museum, or any other type of event, TicketExpress has got you covered. Try us out
                today and experience the ease of selling tickets effortlessly!
              </div><br>
              <router-link class="p-2 mt-3 bg-primary border-0 px-4 bg-gradient rounded-20 text-white" to="/signup">
                Start Selling
              </router-link>
            </div>
          </div>
        </div>
        <div class="col-12 col-md-5 pt-5 p-2">
          <img src="@assets/images/events.jpg" class="w-100 rounded-20" />
        </div>
      </div>
    </div>

    <div class="mt-5 bg-whitesmoke">

    </div>
  </div>
</template>

<script setup>
import Card from "primevue/card"
import Chart from "primevue/chart"
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';

import { ref, onMounted } from "vue"

</script >

<script>
// @ is an alias to /src

export default {
  name: 'HomeView',
  data() {
    return {

    }

  },
  methods: {

  },
  components: {

  },
  mounted() {
  },
  async created() {
  }
}
</script>

<style scoped>
.p-card {
  margin-top: 20px !important;
  /* min-height: 500px; */
  /* overflow: hidden; */
}

.fs-1 {
  font-size: 4vw !important;
}</style>