<template>
  <div class="">
    <te-header></te-header>
    <div class="p-3">
      <h4 class="bold text-primary mb-4">Edit Venue</h4>
      <div class="row">
        <div class="col-12 col-md-6">
          <div>
            <label class="fw-bold mb-1">
              Title
            </label>
            <input placeholder="The Venue's title" class="p-2 border rounded-7 w-100 mb-3" />
          </div>
        </div>
        <div class="col-12 col-md-6">
          <div>
            <label class="fw-bold mb-1">
              Address
            </label>
            <input placeholder="Input venue's full address" class="p-2 border rounded-7 w-100 mb-3" />
          </div>
        </div>

        <div class="col-12 col-md-6">
          <div class="mb-3">
            <label class="fw-bold mb-1">
              Country
            </label>
            <country-select v-model="country" :country="country" topCountry="US" class="w-100 p-2 border rounded-7" />
          </div>
        </div>
        <div class="col-12 col-md-6">
          <div class="mb-3">
            <label class="fw-bold mb-1">
              State
            </label>
            <region-select v-model="region" :country="country" :region="region"  class="w-100 p-2 border rounded-7" />
          </div>
        </div>
        <div class="bg-whitesmoke mt-2 mx-2 rounded-7" style="min-height: 200px;">

        </div>
      </div>
      <button class="btn btn-sm small btn-primary mt-3 mb-4 w-100 w-lg-fit">
        Update Venue
      </button>
    </div>
  </div>
</template>

<script setup>
import InputText from "primevue/inputtext";
import Card from "primevue/card"
import CheckBox from "primevue/checkbox"
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
      ],
      data:{
        country:"US",
        region:"NY"
      },
      country:"US",
      region:"NY",
    }
  }
}
</script>
