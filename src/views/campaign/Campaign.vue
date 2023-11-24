<template>
  <div class="">
    <te-header></te-header>
    <div class="p-3">
      <div class="mb-4 mt-2">
        <span class="bold text-primary h3">Campaigns</span>
        <button class="btn border text-primary bold float-end p-2 rounded-7 btn-sm ">Create Campaign</button>
      </div>
      <div>
        <div class="py-3 ps-3 d-flex align-items-center rounded-7 bg-whitesmoke mt-2" v-for="x in [1, 2, 3, 4, 5, 6]"
          @click="$router.push('/campaign/id')">
          <div>
            <b class="bold">Here is a Promo for you</b>
            <div class="cut-text">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt similique maiores vero facere illo
              soluta quaerat optio qui veritatis. Dolore rerum cum hic reiciendis eligendi libero illo non commodi
              error.</div>
            <div class="cut-text small text-muted mt-1">
              [ Greating@gro.com, grow@ders.com, broke@gets.com, broke@gets.com, broke@gets.com]
            </div>
          </div>
          <div class="text-muted ps-3 ps-sm-5 ps-md-3">
            7:00
          </div>
        </div>
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

<style></style>
