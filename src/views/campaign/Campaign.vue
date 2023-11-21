<template>
  <div class="">
    <te-header></te-header>
    <div class="p-3">
      <h3 class="bold text-primary mb-3">Campaigns</h3>
      <div>
        
      </div>
    </div>
  </div>
</template>

<script setup>
import InputText from "primevue/inputtext";
import Card from "primevue/card"
import Calendar from "primevue/calendar"
import FileUpload from "primevue/fileupload"
import Dropdown from 'primevue/dropdown';

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
        {}, {}, {}
      ]
    }
  }
}
</script>
