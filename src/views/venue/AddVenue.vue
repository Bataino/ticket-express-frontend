<template>
  <div class="">
    <te-header></te-header>
    <form class="p-3" @submit.prevent="createVenue">
      <h4 class="bold text-primary mb-4">New Venue</h4>
      <div class="row">
        <div class="col-12 col-md-6">
          <div>
            <label class="fw-bold mb-1">
              Title
            </label>
            <input placeholder="Le ccusa" v-model="venue.title" class="p-2 border rounded-7 w-100 mb-3" required />
          </div>
        </div>
        <div class="col-12 col-md-6">
          <div>
            <label class="fw-bold mb-1">
              Address
            </label>
            <input placeholder="Input venue's full address" v-model="venue.address" required
              class="p-2 border rounded-7 w-100 mb-3" />
          </div>
        </div>

        <div class="col-12 col-md-6">
          <div class="mb-3">
            <label class="fw-bold mb-1">
              Country
            </label>
            <country-select countryName v-model="venue.country" :country="country" topCountry="US" required
              class="w-100 p-2 border rounded-7" />
          </div>
        </div>
        <div class="col-12 col-md-6">
          <div class="mb-3">
            <label class="fw-bold mb-1">
              State
            </label>
            <region-select countryName regionName v-model="venue.state" :country="venue.country" :region="venue.state" required
              class="w-100 p-2 border rounded-7" />
          </div>
        </div>
        <div>
          <check-box inputId="showCanvas" class="me-2" name="" v-model="showCanvas" :binary="true"></check-box>
          <label for="showCanvas">
            Create Design setting for the Venue
          </label>
        </div>
        <div class="bg-whitesmoke mt-2 mx-2 rounded-7" v-if="showCanvas">
          <venue-builder v-model="venue.setting" class="" style="min-height: 300px;"></venue-builder>
        </div>
      </div>
      <button class="btn btn-sm small btn-primary mt-5 p-3 p-md-2 mb-4 w-100 w-lg-fit" :disabled="!formValidate" type="submit">
        Create Venue
      </button>
    </form>
  </div>
</template>

<script setup>
import InputText from "primevue/inputtext";
import Card from "primevue/card"
import CheckBox from "primevue/checkbox"
import FileUpload from "primevue/fileupload"
import Dropdown from 'primevue/dropdown';
import VenueBuilder from "@/components/VenueBuilder.vue";

</script>

<script>
// @ is an alias to /src

export default {
  name: 'HomeView',
  components: {
  },
  data() {
    return {
      venue: {
        country: "",
        state: ""
      },
      showCanvas: false
    }
  },
  computed: {
    formValidate() {
      const {country, state, title, address} = this.venue
      return country && state && title && address
    }
  },
  methods: {
    async createVenue() {
      // console.log(this.venue)
      // return;
      if (!this.formValidate) {
        this.$toast.show("Fill all Required Inputs")
        return
      }
      this.$widget.openLoading()
      const res = await this.$store.dispatch("createVenueService", this.venue)
      console.log("res", res)
      this.$widget.dismiss()
      
      if (!res.success) {
        this.error = this.$widget.getValidationError(res.errorMessage, "Could not create venue")
        this.$toast.error(this.error)
        return
      }
      else {
        this.$toast.success("Venue has been created successfully")
        this.$router.push("/venues")
      }
      
    }
  }
}
</script>
