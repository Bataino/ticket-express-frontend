<template>
  <div class="">
    <te-header></te-header>
    <div class="py-2 pe-3 text-end bg-whitesmoke text-primary">
      <span class=" text-secondary me-3">
        Delete
      </span>
      <span class="text-warning me-3">
        Edit
      </span>
      <span class="fw-bold">
        Publish Event
      </span>
    </div>
    <div class="px-4 py-3 ">

      <span class="bold text-primary h3">Event Name</span>
      <div class="float-end p-2 ">
        <icon icon="lets-icons:date-today-duotone" class="fs-4 text-primary" />
        <span class="fw-bold">
          Thu, Oct 2022 9pm - Fri Oct 2025 10pm
        </span>
      </div>
      <br>
      <small>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nobis animi nesciunt voluptatibus, ab fugit
        tenet</small>

      <div class="mt-4">
        <div class="d-flex flex-wrap">
          <div class="bg-primary rounded-7 bg-gradient text-light w-fit p-3 pe-5 me-2">
            <span class="h5 bold">
              $30
            </span>
            Order processed
          </div>
          <div class="bg-primary rounded-7 bg-gradient text-light mt-2 w-fit p-3 pe-5 me-2">
            <span class="h5 bold">
              35
            </span>
            Ticket sold
          </div>
          <div class="bg-primary rounded-7 bold mt-2 bg-light text-primary w-fit px-3 py-3 me-2">
            View Campaigns
          </div>
          <div class="bg-primary rounded-7 bold bg-light mt-2 text-secondary w-fit px-3 py-3">
            View Tickets
          </div>
        </div>
      </div>


      <div>
        <card class="border shadow-sm rounded-7">
          <template #title>
            <span class="fs-5 bold text-primary">
              Ticket Levels
            </span>
          </template>
          <template #content>
            <div class="row">
              <div class="col-12 col-md-6">
                <div class="">
                  <DataTable :value="products" tableStyle="">
                    <Column field="name" header="Name"></Column>
                    <Column field="Price" header="Category"></Column>
                  </DataTable>
                </div>
              </div>
              <div class="col-12 col-md-6">
                <div class="">
                  <div class="mb-2 fw-bold">Create new Level</div>
                  <input class="p-2 border rounded-7 w-100 mb-2" placeholder="Name">
                  <input class="p-2 border rounded-7 w-100 mb-2" placeholder="Title">
                  <input class="p-2 border rounded-7 w-100 mb-2" placeholder="Quantity">
                  <input class="p-2 border rounded-7 w-100" placeholder="Limit">
                  <button class="mt-3 btn btn-primary">
                    create
                  </button>
                </div>
              </div>
            </div>
          </template>
        </card>
      </div>

      <div>
        <card class="border shadow-sm rounded-7">
          <template #title>
            <span class="fs-5 bold text-primary">
              Discounts
            </span>
          </template>
          <template #subtitle> Applies on all ticketLevels and only one can be active</template>
          <template #content>
            <DataTable :value="products" tableStyle="">
              <Column field="code" header="Code"></Column>
              <Column field="name" header="Name"></Column>
              <Column field="category" header="Category"></Column>
              <Column field="quantity" header="Quantity"></Column>
            </DataTable>

            <div class="">
              <b>Create Discounts</b>
              <div class="d-flex mt-2 flex-wrap flex-lg-nowrap">
                <input class="p-2 mb-2 me-2 border rounded-7 w-100" placeholder="Name">
                <input class="p-2 mb-2 me-2 border rounded-7 w-100" placeholder="Percentage">
                <input class="p-2 mb-2  border rounded-7 w-100" placeholder="Quantity">
              </div>
              <check-box :binary="true" inputId="make_active" class="small me-2"></check-box>
              <label class="Make the active discount">Make the active Discount</label>
              <br />
              <button class="mt-3 btn btn-primary">
                create
              </button>
            </div>
          </template>
        </card>
      </div>

    </div>
  </div>
</template>

<script setup>
import InputText from "primevue/inputtext";
import Card from "primevue/card"
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import CheckBox from "primevue/checkbox"
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

<style lang="less">
.border {}

.shadow-none {}

;

.p-checkbox {
  .border;
  .shadow-none;
}
</style>