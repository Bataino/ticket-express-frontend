<template>
  <div class="">
    <te-header />
    <div class="p-3 p-md-5">
      <div class="rounded-7 p-2">
        <span class="h6">My Profile</span>
        <button class="p-2 btn btn-primary  float-end" @click="visible = true">
          Edit Profile
        </button>
      </div>

      <div class="rounded-7 p-4 p-md-5 py-5 shadow mt-4">
        <div class="d-flex align-items-center">
          <div class="rounded-circle p-5 w-fit me-3 bg-danger"></div>
          <h4 class="bold">Abdulbateen Jolaosho</h4>
        </div>
        <hr class="my-5" />
        <div class="d-flex justify-content-between flex-wrap flex-md-nowrap">
          <div class="text-muted w-100 w-sm-50 w-md-25 mb-2">
            <small>Email</small>
            <br>
            <a class="text-dark fw-bold" href="mail:to">
              bataino.ronaldo@gmail.com
            </a>
          </div>
          <div class="text-muted w-100 w-md-25 mb-2">
            <small>Phone Number</small>
            <br>
            <a class="text-dark fw-bold" href="mail:to">
              09066299190
            </a>
          </div>
          <div class="text-muted w-100 w-md-25">
            <small>Country</small>
            <br>
            <a class="text-dark fw-bold" href="mail:to">
              US
            </a>
          </div>
        </div>
      </div>
    </div>
    <Dialog modal v-model:visible="visible" header="Transaction Details" style="max-width: 500px;">
      <div class="p-3 p-md-3 w-100 text-nowrap">
        <div class="text-center">
          <input type="file" class="" hidden id="dp" />
          <label class="rounded-circle p-5 w-fit me-3 bg-danger" for="dp"></label>
        </div>
        <div class="row">
          <div class="col-12 col-md-12">
            <div>
              <label class="fw-bold mb-1">
                Email
              </label><br>
              <input placeholder="email" class="p-2 border rounded-7 w-100 mb-3" />
            </div>
          </div>
          <div class="col-12 col-md-12">
            <div>
              <label class="fw-bold mb-1">
                Phone
              </label><br>
              <input placeholder="Phone" class="p-2 border rounded-7 w-100 mb-3" />
            </div>
          </div>

          <div class="col-12 col-md-12">
            <div class="mb-3">
              <label class="fw-bold mb-1">
                Country
              </label><br>
              <input placeholder="country" class="p-2 border rounded-7 w-100 mb-3" />
            </div> <button class="p-2 btn btn-primary w-fit" @click="visible = true">
              Update Profile
            </button>
          </div>


          <hr class="my-4" />


          <span class="mb-3 bold text-muted fs-6">Change Password</span>
          <div class="col-12 col-md-12">
            <div class="mb-3">
              <label class="fw-bold mb-1">
                Old password
              </label><br>
              <input placeholder="*****" class="p-2 border rounded-7 w-100 mb-3" />
            </div>
          </div>
          <div class="col-12 col-md-6">
            <div class="mb-3">
              <label class="fw-bold mb-1">
                New password
              </label><br>
              <input placeholder="*****" class="p-2 border rounded-7 w-100 mb-3" />
            </div>
          </div>
          <div class="col-12 col-md-6">
            <div class="mb-3">
              <label class="fw-bold mb-1">
                Confirm password
              </label><br>
              <input placeholder="*****" class="p-2 border rounded-7 w-100 mb-3" />
            </div>
          </div>

          <div class="col-12 col-md-6">
            <div class="mb-3">
              <button class="p-2 btn btn-primary" @click="visible = true">
                Change Password
              </button>
            </div>
          </div>

        </div>
      </div>
    </Dialog>
  </div>
</template>

<script setup>
import Transaction from "@components/Transaction.vue";
import Dialog from "primevue/dialog";
import DataTable from "primevue/datatable"
import Column from "primevue/column"
</script>

<script>
// @ is an alias to /src

export default {
  name: 'Order',
  components: {
  },
  data() {
    return {
      visible: false,
      orders: [
        { id: 2, event: "ODS", tickets: 34, price: 234 },
        {}
      ],
      classes: ['']
    }
  },
  methods: {
    showOrder(event) {
      this.modalEvent = event.data
      this.visible = true
      console.log(event.data)
    }
  }
}
</script>
