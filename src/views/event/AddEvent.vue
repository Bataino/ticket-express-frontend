<template>
  <div class="">
    <te-header></te-header>
    <form class="p-3" @submit.prevent="createEvent" _style="max-width:99vw;">
      <!-- <h4 class="bold text-primary mb-3 mt-2">Create New Event</h4> -->
      <div class="row overflow-hidden" style="overflow:hidden">
        <div class="col-12 col-md-6">
          <div>
            <label class="fw-bold mb-1">
              Title
            </label>
            <input placeholder="Le ccusa" autocomplete v-model="event.title" class="p-2 border rounded-7 w-100 mb-3" />
          </div>
        </div>
        <div class="col-12 col-md-6">
          <div>
            <label class="fw-bold mb-1">
              Description
            </label>
            <textarea v-model="event.description" autocomplete placeholder="A description about the event"
              class="p-2 border rounded-7 w-100 mb-3" style="min-height: 100px;"></textarea>
          </div>
        </div>
        <div class="col-12 col-md-6">
          <div>
            <label class="fw-bold mb-1">
              Start date
            </label>
            <Calendar v-model="event.start" placeholder="starting period of the event" :min-date="new Date()" showTime
              class="mb-3 rounded-7 w-100">
            </Calendar>
          </div>
        </div>
        <div class="col-12 col-md-6">
          <div class="mb-3">
            <label class="fw-bold mb-1">
              End date
            </label>
            <Calendar v-model="event.end" placeholder="end time of the event" showTime :min-date="event.start"
              class="rounded-7 w-100"></Calendar>
          </div>
        </div>
        <div class="col-12 col-md-6">
          <div class="mb-3">
            <label class="fw-bold mb-1">
              Add Venue
            </label>
            <Dropdown v-model="venue" :options="$store.state.venues" optionLabel="title" placeholder="Select a Venue"
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
          <div class="mb-3">
            <label class="fw-bold mb-1">
              Select Timezone
            </label>
            <Dropdown v-model="event.time_zone" :options="zones" filter optionLabel="" placeholder="Select a TimeZone"
              class="w-100 mb-1">
            </Dropdown>
          </div>
        </div>
        <div class="col-12 col-md-12">
          <div class="mb-3 d-flex flex-wrap">
            <div class="fw-bold mb-1 w-100">Add files</div><br>
            <label class="fw-bold mb-1" for="files">
              <div class="py-4 px-3 bg-primary rounded-7">
                <icon icon="mingcute:add-fill" class="fs-1 text-white" />
              </div>
            </label>
            <div class="p-1 me-2 position-relative rounded-7 overflow-hidden w-fit" v-for="(file, index) in files"
              style="max-width: 160px;height: 200px;">
              <img class="w-100 rounded-7 object-fit-cover" :src="getUrl(file)" />
              <icon icon="icons8:cancel" class="fs-2 pe-point text-danger position-absolute top-0 start-0"
                @click="files.splice(index, 1)" />
            </div>
            <input type="file" multiple ref="files" accept="image/*" id="files" hidden @change="updateFiles" />
          </div>
        </div>
      </div>
      <button class="btn btn-primary mt-3 mb-4 p-2 w-100 w-lg-fit" type="submit">
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
import moment from "moment-timezone"

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
      zones
    }
  },
  methods: {
    getFormData() {
      const formdata = new FormData()
      this.event.start = new Date(this.event.start).toLocaleString()
      this.event.end = new Date(this.event.end).toLocaleString()
      this.event.time_zone = moment.tz(this.event.time_zone).zoneName();

      formdata.append("title", this.event.title)
      formdata.append("description", this.event.description)
      formdata.append("start", this.event.start)
      formdata.append("end", this.event.end)
      formdata.append("venue_id", this.event.venue_id)
      formdata.append("time_zone", this.event.time_zone)

      this.files.forEach((file) => formdata.append("files[]", file));

      return formdata
    },
    async createEvent() {
      console.log(Object.keys(this.event).length)
      if (Object.keys(this.event).length < 6 || !this.files[0]) {
        this.$toast.error("All fields are required")
        return
      }

      const formdata = this.getFormData()
      this.$widget.openLoading()
      const res = await this.$store.dispatch('createEventService', formdata)
      // console.log(res.data,"DATA")
      if (res.success) {
        this.$toast.success('Event has been successfully created')
        location.href = '/event/' + res.data.id
        return
      }
      this.$widget.dismiss()
      this.$toast.error("Could not create event")
    },
    getUrl(file) {
      return URL.createObjectURL(file)
    },
    updateFiles() {
      console.log(this.$refs.files.files)

      const isNotImage = Array.from(this.$refs.files.files).find((e) => !e.type.includes("image"))
      const isBig = Array.from(this.$refs.files.files).find((e) => e.size > 2097152)

      if (isBig) {
        this.$toast.error("File size must not exceed 2MB")
        return
      }
      if (isNotImage) {
        this.$toast.error("File type must be image")
        return
      }

      this.files.push(...this.$refs.files.files)
      // console.log(this.files, this.$refs.files.files)
      // this.$refs.files.files = []
    }
  },
  watch: {
    venue(venue) {
      this.event.venue_id = venue.id
    },
  },
  created() {
    this.$store.dispatch('getVenueService')
  }
}
</script>
