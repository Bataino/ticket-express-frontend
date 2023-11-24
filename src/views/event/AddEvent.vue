<template>
  <div class="">
    <te-header></te-header>
    <form class="p-3" @submit.prevent="createEvent">
      <h3 class="bold text-primary mb-3">Create New Event</h3>
      <div class="row">
        <div class="col-12 col-md-6">
          <div>
            <label class="fw-bold mb-1">
              Title
            </label>
            <input placeholder="Le ccusa" v-model="event.title" class="p-2 border rounded-7 w-100 mb-3" />
          </div>
        </div>
        <div class="col-12 col-md-6">
          <div>
            <label class="fw-bold mb-1">
              Description
            </label>
            <textarea v-model="event.description" placeholder="A description about the event" class="p-2 border rounded-7 w-100 mb-3"
              style="min-height: 100px;"></textarea>
          </div>
        </div>
        <div class="col-12 col-md-6">
          <div>
            <label class="fw-bold mb-1">
              Start date
            </label>
            <Calendar v-model="event.start" placeholder="starting period of the event" class="mb-3 rounded-7 w-100"></Calendar>
          </div>
        </div>
        <div class="col-12 col-md-6">
          <div class="mb-3">
            <label class="fw-bold mb-1">
              End date
            </label>
            <Calendar v-model="event.end" placeholder="end time of the event" showDate class="rounded-7 w-100"></Calendar>
          </div>
        </div>
        <div class="col-12 col-md-6">
          <div class="mb-3">
            <label class="fw-bold mb-1">
              Add Venue
            </label>
            <Dropdown v-model="venue" :options="$store.state.venue" optionLabel="title" placeholder="Select a Venue"
              class="w-100 mb-1" />
            <router-link class="text-primary fw-bold pe-point w-fit" to="/venue/add">
              <icon icon="solar:home-add-broken" class="my-auto" />
              <span class="pe-point small">
                create new venue
              </span>
            </router-link>
          </div>
        </div>
        <div class="col-12 col-md-6">
          <div class="mb-3 d-flex flex-wrap">
            <div class="fw-bold mb-1 w-100">Add files</div><br>
            <label class="fw-bold mb-1" for="files">
              <div class="py-4 px-3 bg-primary rounded-7">
                <icon icon="mingcute:add-fill" class="fs-1 text-white" />
              </div>
            </label>
            <div class="p-1 me-2 position-relative rounded-7 overflow-hidden w-fit" v-for="(file, index) in files" style="max-width: 160px;height: 200px;">
              <img class="w-100 rounded-7 object-fit-cover" :src="getUrl(file)" />
              <icon icon="icons8:cancel" class="fs-2 pe-point text-danger position-absolute top-0 start-0" @click="files.splice(index, 1)" />
            </div>
            <input type="file" multiple ref="files" accept="images/*" id="files" hidden @change="updateFiles" />
          </div>
        </div>
      </div>
      <button class="btn btn-primary mt-3 mb-4 w-100 w-lg-fit" type="submit">
        Create Event
      </button>
    </form>
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
      event: {},
      venue:{},
      files:[]
    }
  },
  methods: {
    createEvent(){
      console.log(Object.keys(this.event).length)
      if(this.event.length < 5 || !this.files[0]){
        this.$toast.error("All fields are required")
        return
      }
    },
    getUrl(file){
      return URL.createObjectURL(file)
    },
    updateFiles(){
      console.log(this.$refs.files.files)
      this.files.push(...this.$refs.files.files)
      this.$refs.files.files = []
    }
  },
  watch: {
    venue(venue){
      this.event.venue_id = venue.id
    },
  },
  created(){
    this.$store.dispatch('getVenueService')
  }
}
</script>
