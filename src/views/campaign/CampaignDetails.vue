<template>
  <div class="">
    <te-header></te-header>
    <div class="text-end pt-3 pe-3">
      <!-- <span class="bg-warning rounded-20 text-white p-1 px-4 bold">
        draft
      </span>
      <span class="bg-success rounded-20 text-white p-1 px-4 bold">
        sent
      </span> -->
      <span class="bg-secondary rounded-20 text-white p-1 px-4 bold">
        sending...
      </span>
    </div>
    <div class="p-3 pt-2">
      <div class="row">
        <div class="col-12 col-md-6">
          <label class="fw-bold">
            Mail Subject
          </label>
          <input type="text" placeholder="input the mail subject" class="p-2 border rounded-7 w-100 mb-3" />
        </div>
        <div class="col-12 col-md-6">
          <label class="fw-bold">
            Mail Recepients
          </label>
          <MultiSelect v-model="selectedCities" display="chip" :options="cities" optionLabel="name"
            placeholder="Select Cities" class="w-100 mb-3" />
        </div>
      </div>
      <Editor v-model="value" editorStyle="height: 320px" placeholder="Input Email Body" class="mt-3" />
      <div class="my-3">
        <button class="btn btn-primary rounded-7 p-2 px-3 btn-sm ">Save</button>
        <button class="btn btn-warning rounded-7 p-2 px-3 btn-sm ms-2">Send</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import Chips from "primevue/chips"
import Editor from "primevue/editor"
import MultiSelect from "primevue/multiselect"
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

<style></style>
