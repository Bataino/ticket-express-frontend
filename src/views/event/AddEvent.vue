<template>
  <div class="">
    <te-header></te-header>
    <div class="p-3">
      <h3 class="bold text-primary mb-3">Create New Event</h3>
      <div class="row">
        <div class="col-12 col-md-6">
          <div>
            <label class="fw-bold mb-1">
              Title
            </label>
            <input placeholder="Le ccusa" class="p-2 border rounded-7 w-100 mb-3" />
          </div>
        </div>
        <div class="col-12 col-md-6">
          <div>
            <label class="fw-bold mb-1">
              Description
            </label>
            <textarea placeholder="A description about the event" class="p-2 border rounded-7 w-100 mb-3"
              style="min-height: 100px;"></textarea>
          </div>
        </div>
        <div class="col-12 col-md-6">
          <div>
            <label class="fw-bold mb-1">
              Start date
            </label>
            <Calendar placeholder="starting period of the event" class="mb-3 rounded-7 w-100"></Calendar>
          </div>
        </div>
        <div class="col-12 col-md-6">
          <div class="mb-3">
            <label class="fw-bold mb-1">
              End date
            </label>
            <Calendar placeholder="end time of the event" showDate class="rounded-7 w-100"></Calendar>
          </div>
        </div>
        <div class="col-12 col-md-6">
          <div class="mb-3">
            <label class="fw-bold mb-1">
              Add Venue
            </label>
            <Dropdown v-model="selectedCity" :options="cities" optionLabel="name" placeholder="Select a Venue"
              class="w-100" />
            <div class="mt-2 small text-primary fw-bold">
              <icon icon="solar:home-add-broken" class="my-auto" />
              create new venue
            </div>
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
            <div class="py-4 px-5 mx-2 bg-whitesmoke rounded-7 w-fit">
              
            </div>
            <input type="file" id="files" hidden />
          </div>
        </div>
      </div>
      <button class="btn btn-primary mt-3 float-end mb-4 w-100 w-lg-fit">
        Create Event
      </button>
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
