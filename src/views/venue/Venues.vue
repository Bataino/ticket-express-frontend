<template>
  <div class="">
    <te-header></te-header>
    <div class="px-4">
      <div class="d-flex btn btn-sm small px-2 border align-items-center p-2 text-primary bold my-3 w-fit" @click="$router.push('/venue/add')">
        Create Venue
      </div>
      <div class="d-flex flex-wrap justify-content-center justify-content-md-start mw-100 p-2 mt-3">
      <card style="min-width:290px;max-width: 300px;" class="m-2 me-3" v-for="product in products">
        <template #title> 
          <div class="h6 bold text-muted">
            June 12 Cultural center 
          </div>
        </template>
        <template #subtitle> 12, Kuto, Abeokuta. </template>
        <template #content>
        </template>
      </card>

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
      products: [
        {},{},{}
      ]
    }
  }
}
</script>
