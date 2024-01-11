<template>
  <div class="">
    <te-header></te-header>
    <div class="px-4">
      <div class="d-flex btn btn-sm small px-2 border align-items-center p-2 text-primary bold my-3 w-fit" @click="$router.push('/venue/add')">
        Create Venue
      </div>
      <div class="d-flex flex-wrap justify-content-start justify-content-md-start mw-100 p-2 mt-3">
        <div class="col-12 col-md-6" v-for="venue in $store.state.venues">
          <card class="m-2 me-3 pe-point border shadow-sm" @click="$router.push('/venue/edit/'+ venue.id)">
            <template #title> 
              <div class="h6 bold text-muted">
                {{ venue.title}} 
              </div>
            </template>
            <template #subtitle> {{ venue.address }} </template>
            <template #content>
          <div class="bold">
            <span>Country: </span> {{ venue.country }}
          </div>
          <div class="bold">
            <span>State: </span> {{ venue.state }}
          </div>
          <!-- <router-link :to="`/venue/edit/${product.id}`">
            <icon class="fs-6 text-muted" icon="fa:edit" />
          </router-link> -->
        </template>
      </card>
    </div>
      
    </div>
    </div>
    <!-- <Dialog>

    </Dialog> -->
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
    }
  },
  created(){
    this.$store.dispatch("getVenueService")
  }
}
</script>

