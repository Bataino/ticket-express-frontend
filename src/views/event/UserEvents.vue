<template>
  <div class="">
    <te-header></te-header>
    <div class="px-4 me-2">
      <div class="d-flex ms-1 align-items-center justify-content-between pt-3">
        <span class="h4 bold text-secondary">
          Pages
        </span>
        <div class="btn bg-whitesmoke px-4 rounded-7 pe-point mt-2 d-flex align-items-center p-2 text-primary bold mb-3"
          @click="$router.push('/event/add')">
          create Page
        </div>
      </div>
      <div class="d-flex ms-1 w-100 justify-content-center">
        <div class="card flex w-100 flex-wrap rounded-7 py-1 justify-content-center gap-3">
          <span class="p-input-icon-left">
            <i class="pi pi-search" />
            <InputText v-model="search" placeholder="Keyword" class="w-100 border-0" />
          </span>
        </div>
        <!-- <div class="btn btn-primary small d-flex align-items-center rounded-7 ms-2">
          <span class="my-auto">search</span>
        </div> -->
      </div>
      <div class="py-4">
        <div class="row" v-if="events.length != 0">
          <div class="col-12 col-sm-6 col-md-4 co-lg-3" v-for="event in events">
            <card style="min-width:100%;" class="m-2 mw-100 me-3 rounded-7 shadow"
              @click="$router.push('/event/' + event.id)">
              <template #title>
                <div class="h6 bold text-muted">
                  {{ event.title }}
                </div>
              </template>
              <template #subtitle>
                <div class="cuttext">{{ event.description }} </div>
              </template>
              <template #content>
                <h2 class="bold text-primary">${{ getTotalTicketsCost(event.orders) }}</h2>
                <small>{{ event.tickets.length }} Tickets sold</small>
              </template>
            </card>
          </div>
        </div>
        <div class="text-center h5 text-muted mt-3 bold py-5" v-else>
          <icon icon="teenyicons:mood-sad-outline" class="fs-1" />
          No event could be found<br>
          <router-link to="/event/add" class="btn text-primary bold bg-whitesmoke small mt-3">
            Create one
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import InputText from "primevue/inputtext";
import Card from "primevue/card"
</script>

<script>
// @ is an alias to /src

export default {
  name: 'HomeView',
  components: {
  },
  data() {
    return {
      search: '',
      events: []
    }
  },
  methods: {
    getTotalTicketsCost(orders) {
      if (orders[0]) {
        let total = orders.reduce((acc, e) => {
          console.log(acc, e)
          return acc + e.price
        }, 0)
        return total
      }

      return 0
    },
  },
  watch: {
    search(value) {
      this.events = this.$store.state.events.filter((e) => {
        return e.title.toLowerCase().includes(value) || e.description.toLowerCase().includes(value)
      })
    }
  },
  async created() {
    await this.$store.dispatch('getUserEventService')
    this.events = this.$store.state.events
    // console.log(localStorage.getItem('token'))
  }
}
</script>

<style>
.cuttext {
  text-overflow: ellipsis;
  overflow: hidden;
  width: 100%;
  max-width: 75% !important;
  height: 1.2em;
  white-space: nowrap;
}
</style>