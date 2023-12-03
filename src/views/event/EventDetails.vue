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
          {{ new Date($store.state.event.start).toLocaleString() }} - {{ new
            Date($store.state.event.start).toLocaleString() }}
        </span>
      </div>
      <br>
      <small>{{ $store.state.event.description }}</small>

      <div class="mt-4">
        <div class="d-flex flex-wrap">
          <router-link :to="/orders/+ $store.state.event.orders.id" class="pe-point bg-primary rounded-7 bg-gradient text-light w-fit p-3 pe-5 me-2">
            <span class="h5 bold">
              {{ $te.currency }}{{ $widget.getTotalOrders($store.state.event.orders) }}
            </span>
            Order processed
          </router-link>
          <div class="pe-point bg-primary rounded-7 bg-gradient text-light mt-2 w-fit p-3 pe-5 me-2">
            <span class="h5 bold">
              {{ $store.state.event.tickets?.length }}
            </span>
            Ticket sold
          </div>
          <div class="pe-point rounded-7 bold mt-2 bg-light text-primary w-fit px-3 py-3 me-2">
            View Campaigns
          </div>
          <!-- <div class="pe-point rounded-7 bold bg-light mt-2 text-secondary w-fit px-3 py-3">
            View Tickets
          </div> -->
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
              <div class="col-12 col-md-7 col-lg-8">
                <div class="">
                  <DataTable :value="$store.state.event.ticket_levels" tableStyle="">
                    <Column field="title" header="Title"></Column>
                    <Column field="price" header="Price">
                      <template #body="e">
                        {{ $te.currency }}{{ e.data.price }}
                      </template>
                    </Column>
                    <Column field="quantity" header="Qty"></Column>
                    <Column field="limit" header="Limit"></Column>
                    <Column field="is_available" header="Availablity">
                      <template #body="e">
                        <button class="bg-danger text-nowrap small border-0 rounded text-white"
                          @click="toggleTicketLevel(e.data)" v-if="e.data.is_available">
                          make unavailable
                        </button>
                        <button class="bg-success text-nowrap small border-0 rounded text-white"
                          @click="toggleTicketLevel(e.data)" v-else>
                          make available
                        </button>
                      </template>
                    </Column>
                    <Column field="" header="">
                      <template #body="e">
                        <icon icon="bx:edit" class="fs-4 text-muted pe-point" @click="makeUpdateTicket(e.data)" />
                        <icon icon="fluent:delete-20-filled" class="fs-4 ms-2 text-secondary pe-point"
                          @click="deleteTicketLevel(e.data)" />
                      </template>
                    </Column>
                  </DataTable>
                </div>
              </div>
              <div class="col-12 col-md-5 col-lg-4">
                <form class="" @submit.prevent="updateTicketLevel" id="ticketForm" v-if="updateTicket">
                  <div class="mb-2 bold fs-6 mt-2 mt-md-0">Update {{ update.title }}
                    <icon icon="fluent-mdl2:cancel" class="fw-bold float-end pe-point text-danger"
                      @click="updateTicket = null" />
                  </div>
                  <label class="fw-bold">Title</label>
                  <input class="p-2 border rounded-7 w-100 mb-2" v-model="updateTicket.title" required
                    placeholder="Title">
                  <label class="fw-bold">Price</label>
                  <input class="p-2 border rounded-7 w-100 mb-2" min="1" type="number" v-model="updateTicket.price"
                    required placeholder="price">
                  <label class="fw-bold">Quantity</label><br>
                  <span class="small text-muted">Maximum number of ticket available to be bought</span><br>
                  <input class="p-2 border rounded-7 w-100 mb-2" min="1" type="number" v-model="updateTicket.quantity"
                    required placeholder="quantity">
                  <label class="fw-bold">Limit(Optional)</label><br>
                  <span class="small text-muted">Maximum number that can be bought by a user</span><br>
                  <input class="p-2 border rounded-7 w-100" v-model="updateTicket.limit" placeholder="Limit">
                  <button class="mt-3 btn btn-primary" type="submit">
                    update
                  </button>
                </form>
                <form class="" @submit.prevent="createTicketLevel" id="ticketForm" v-else>
                  <div class="mb-2 bold fs-6 mt-2 mt-md-0">Create new Level</div>
                  <label class="fw-bold">Title</label>
                  <input class="p-2 border rounded-7 w-100 mb-2" v-model="ticketLevel.title" required placeholder="Title">
                  <label class="fw-bold">Price</label>
                  <input class="p-2 border rounded-7 w-100 mb-2" min="1" type="number" v-model="ticketLevel.price"
                    required placeholder="price">
                  <label class="fw-bold">Quantity</label><br>
                  <span class="small text-muted">Maximum number of ticket available to be bought</span><br>
                  <input class="p-2 border rounded-7 w-100 mb-2" min="1" type="number" v-model="ticketLevel.quantity"
                    required placeholder="quantity">
                  <label class="fw-bold">Limit(Optional)</label><br>
                  <span class="small text-muted">Maximum number that can be bought by a user</span><br>
                  <input class="p-2 border rounded-7 w-100" v-model="ticketLevel.limit" placeholder="Limit">
                  <button class="mt-3 btn btn-primary" type="submit">
                    create
                  </button>
                </form>
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
          <template #subtitle> Discount applies on all ticket levels and only one can be active</template>
          <template #content>
            <DataTable :value="$store.state.event.discounts" tableStyle="">
              <Column field="title" header="Title"></Column>
              <Column field="percentage" header="Percentage">
                <template #body="e">
                  {{ e.data.percentage }}%
                </template>
              </Column>
              <Column field="status" header="Status">
                <template #body="e">
                  <button class="bg-danger text-nowrap small border-0 rounded text-white" @click="toggleDiscount(e.data)"
                    v-if="e.data.status">
                    deactivate
                  </button>
                  <button class="bg-success text-nowrap small border-0 rounded text-white" @click="toggleDiscount(e.data)"
                    v-else>
                    activate
                  </button>
                </template>
              </Column>
              <Column field="" header="">
                <template #body="e">
                  <icon icon="bx:edit" class="fs-4 text-muted pe-point" @click="makeUpdateDiscount(e.data)" />
                  <icon icon="fluent:delete-20-filled" class="fs-4 ms-2 text-secondary pe-point"
                    @click="deleteDiscount(e.data)" />
                </template>
              </Column>
            </DataTable>

            <form class="" v-if="updateDisc" @submit.prevent="updateDiscount" id="discountForm">
              <div class="mb-2 bold fs-6 mt-2 mt-md-0">Update Discount
                <icon icon="fluent-mdl2:cancel" class="fw-bold float-end pe-point text-danger"
                  @click="updateDisc = null" />
              </div>
              <div class="d-flex mt-2 flex-wrap flex-lg-nowrap">
                <input class="p-2 mb-2 me-2 border rounded-7 w-100" required v-model="updateDisc.title"
                  placeholder="Title">
                <input class="p-2 mb-2 me-2 border rounded-7 w-100" required v-model="updateDisc.percentage" type="number"
                  placeholder="Percentage">
              </div>
              <br />
              <button class="mt-3 btn btn-primary" type="submit">
                update
              </button>
            </form>
            <form class="" v-else @submit.prevent="createDiscount" id="discountForm">
              <b>Create Discounts</b>
              <div class="d-flex mt-2 flex-wrap flex-lg-nowrap">
                <input class="p-2 mb-2 me-2 border rounded-7 w-100" required v-model="discount.title" placeholder="Title">
                <input class="p-2 mb-2 me-2 border rounded-7 w-100" required v-model="discount.percentage"
                  placeholder="Percentage">
              </div>
              <check-box :binary="true" inputId="make_active" v-model="discount.make_active"
                class="small me-2"></check-box>
              <label class="Make the active discount">Make the active Discount</label>
              <br />
              <button class="mt-3 btn btn-primary">
                create
              </button>
            </form>
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
import { mapActions } from "vuex";

export default {
  name: 'HomeView',
  components: {
  },
  data() {
    return {
      ticketLevel: {},
      updateTicket: null,
      updateDisc: null,
      discount: {}
    }
  },
  methods: {
    async createTicketLevel() {
      this.$widget.openLoading()
      this.ticketLevel.event_id = this.$route.params.id
      const res = await this.createTicketLevelService(this.ticketLevel)
      if (res.success) {
        this.$toast.success('Ticket Level has been successfully added')
        this.ticketLevel = {}
      }
      this.update()
      this.$widget.dismiss()
    },
    async updateTicketLevel() {
      this.$widget.openLoading()
      const res = await this.updateTicketLevelService({
        id: this.updateTicket.id,
        data: this.updateTicket
      })
      this.update()
      this.$widget.dismiss()
      if (res.success) {
        this.$toast.success('Ticket Level has been successfully updated')
        this.updateTicket = null
        return
      }
      const msg = this.$widget.getValidationError(res.data.errorMessage)
      this.$toast.error(msg ?? 'Ticket Level could not be updated')
    },
    async deleteTicketLevel(level) {
      const yeahDo = confirm("Are you sure you want to delete")
      if (!yeahDo) {
        return
      }
      this.$widget.openLoading(level)
      const res = await this.deleteTicketLevelService(level.id)
      this.update()
      this.$widget.dismiss()
      if (res.success) {
        this.$toast.success('Ticket Level has been successfully DELETED')
        return
      }
      const msg = this.$widget.getValidationError(res.data.errorMessage)
      this.$toast.error(msg ?? 'Ticket Level could not be updated')
    },
    update() {
      this.$store.dispatch('getSingleEventService', this.$route.params.id)
    },
    toggleTicketLevel(ticketLevel) {
      this.updateTicketLevelService({
        id: ticketLevel.id,
        data: {
          is_available: !ticketLevel.is_available
        }
      })
      this.update()
    },
    makeUpdateTicket(tick) {
      this.updateTicket = tick
      this.$widget.scrollTo('ticketForm')
    },
    toggleDiscount(disc) {
      this.updateDiscountService({
        id: disc.id,
        data: {
          status: !disc.status ?? 0
        }
      })
      this.update()
    },
    async createDiscount() {
      this.$widget.openLoading()
      this.discount.event_id = this.$route.params.id
      const res = await this.createDiscountService(this.discount)
      if (res.success) {
        this.$toast.success('Discount has been successfully added')
        this.discount = {}
      }
      this.update()
      this.$widget.dismiss()
    },
    async updateDiscount() {
      this.$widget.openLoading()
      const res = await this.updateDiscountService({
        id: this.updateDisc.id,
        data: this.updateDisc
      })
      this.update()
      this.$widget.dismiss()
      if (res.success) {
        this.$toast.success('Ticket Level has been successfully updated')
        this.updateDisc = null
        return
      }
      const msg = this.$widget.getValidationError(res.data.errorMessage)
      this.$toast.error(msg ?? 'Discount could not be updated')
    },
    async deleteDiscount(level) {
      const yeahDo = confirm("Are you sure you want to delete")
      if (!yeahDo) {
        return
      }
      this.$widget.openLoading()
      const res = await this.deleteDiscountService(level.id)
      this.update()
      this.$widget.dismiss()
      if (res.success) {
        this.$toast.success('Discount has been successfully DELETED')
        return
      }
      const msg = this.$widget.getValidationError(res.data.errorMessage)
      this.$toast.error(msg ?? 'Discount could not be DELETED')
    },
    makeUpdateDiscount(disc) {
      this.updateDisc = disc
      this.$widget.scrollTo('discountForm')
    },
    ...mapActions([
      "createTicketLevelService", "updateTicketLevelService", "updateDiscountService", "createDiscountService",
      "deleteDiscountService", "deleteTicketLevelService"
    ])
  },
  async created() {
    await this.$store.dispatch('getSingleEventService', this.$route.params.id)
    console.log(this.$store.state.event.discounts)
  }
}
</script>

<style lang="less">
.border {}

.bold {}

.shadow-none {}

;

.p-column-title {
  .bold !important;
}

.p-checkbox {
  .border;
  .shadow-none;
}</style>