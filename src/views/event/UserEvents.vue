<template>
  <div class="">
    <te-header></te-header>
    <div class="px-4">
      <div class="float-end d-flex align-items-center p-2 text-primary bold mb-3" @click="$router.push('/event/add')">
        <icon icon="solar:calendar-add-bold" class="fs-3 me-1" />
        Add Event
      </div>
      <div class="d-flex w-100 justify-content-center">
        <div class="card flex w-100 flex-wrap rounded-7 py-1 justify-content-center gap-3">
          <span class="p-input-icon-left">
            <i class="pi pi-search" />
            <InputText v-model="value1" placeholder="Keyword" class="w-100 border-0" />
          </span>
        </div>
        <div class="btn btn-primary small pt-2 rounded-7 ms-2">
          <span>search</span>
        </div>
      </div>
      <div class="d-flex flex-wrap justify-content-center justify-content-md-start mw-100 p-2 mt-3">
      <card style="min-width:290px;max-width: 300px;" class="m-2 me-3" v-for="product in products" @click="$router.push('/event/id')">
        <template #title> 
          <div class="h6 bold text-muted">
            Recent Orders 
            <icon icon="tabler:edit" class="fs-1 float-end text-muted" @click="$router.push('/event/edit/id')" />
          </div>
        </template>
        <template #subtitle> Event Name </template>
        <template #content>
          <h2 class="bold text-primary">$24</h2>
          <small>34 Tickets sold</small>
        </template>
        <!-- <template #footer>
          <div class="d-flex justify-content-around text-muted">
            <icon icon="tabler:edit" class="fs-1" />
          </div>
        </template> -->
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
