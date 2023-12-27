<template>
  <div class="">
    <te-header></te-header>
    <div class="py-2 pe-3 text-end bg-whitesmoke text-primary">
      <!-- <span class=" text-secondary me-3" @click="deleteEvent">
        Delete
      </span> -->
      <button class="pe-point bold me-3 border-0 bg-transparent text-primary" @click="copyLink" v-if="$store.state.event.is_publish == 1">
        Share
      </button>
      <a :href="getLink()" v-if="$store.state.event.ticket_levels?.[0]" class="pe-point bold me-3 border-0 bg-transparent text-dark">
        View
      </a>
      <router-link :to="'/event/edit/' + $route.params.id" class="pe-point text-warning bold me-3">
        Edit
      </router-link>
      <span class="" @click="publishEvent">
        <span class="pe-point bold" v-if="$store.state.event.is_publish == 0">
          Publish
        </span>
        <span class="pe-point text-muted" v-else>
          Unpublish
        </span>
      </span>
    </div>
    <div class="px-4 py-3 ">

      <span class="bold text-primary h3">{{ $store.state.event.title }}</span>
      <div class="py-2 ">
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
          <div class="bg-primary rounded-7 bg-gradient text-light mt-2 w-fit p-3 pe-5 me-2">
            Today<br>
            <span class="h5 bold">
              {{ $widget.getTicketNumber($store.state.orderSummary.orders_today) ?? 0 }} Tickets
            </span>
          </div>
          <div class="bg-success rounded-7 bg-gradient mt-2 mt-md-0 text-light mt-2 w-fit p-3 pe-5 me-2">
            Today<br>
            <span class="h5 bold me-5">
              {{ $te.currency }}{{ $store.state.orderSummary.sale_today ?? 0 }}
            </span>
          </div>
          <div class="pe-point bg-primary rounded-7 bg-gradient mt-2 mt-md-0 text-light w-fit p-3 pe-5 me-2">
            Order processed<br>
            <span class="h5 bold">
              {{ $te.currency }}{{ $store.state.orderSummary.total_sale }}
            </span>
          </div>
          <div class="pe-point bg-warning rounded-7 bg-gradient mt-2 mt-md-0 text-dark mt-2 w-fit p-3 pe-5 me-2">
            Ticket sold<br>
            <span class="h5 bold">
              {{ $store.state.tickets?.length ?? 0 }}
            </span>
          </div>
          <!-- <div class="pe-point rounded-7 bold mt-2 bg-light text-primary w-fit px-3 py-3 me-2">
            View Campaigns
          </div> -->
          <!-- <div class="pe-point rounded-7 bold bg-light mt-2 text-secondary w-fit px-3 py-3">
            View Tickets
          </div> -->
        </div>
      </div>

      <div class="my-3 bg-whitesmoke rounded-7 py-2">
        <select-button class="m" :options="options" optionLabel="label" dataKey="value" v-model="option"></select-button>
      </div>

      <div class="pb-5" v-if="option.value == 'ticket_level'">
        <card class="border shadow-sm rounded-7">
          <template #title>
            <span class="fs-5 bold text-primary">
              Ticket Levels
            </span>
          </template>
          <template #content>
            <div class="row">
              <div class="col-12">
                <div class="">
                  <DataTable :value="$store.state.ticket_levels" tableStyle="">
                    <Column field="title" header="Title"></Column>
                    <Column field="price" header="Price">
                      <template #body="e">
                        {{ $te.currency }}{{ e.data.price }}
                      </template>
                    </Column>
                    <Column field="quantity" header="Qty"></Column>
                    <Column field="limit" header="Limit"></Column>
                    <Column field="is_available" header="Availablity" v-if="$store.state.ticket_levels.length != 1">
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

      <div class="" v-else-if="option.value == 'order'">
        <order-page></order-page>
      </div>

      <div class="" v-else-if="option.value == 'ticket'">
        <ticket-page></ticket-page>
      </div>


      <div class="d-none">
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
import SelectButton from "primevue/selectbutton"
import OrderPage from "@/views/Orders.vue"
import TicketPage from "@/views/Tickets.vue"

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
      discount: {},
      option: {
        label: 'Orders',
        value: 'order'
      },
      options: [
        {
          label: 'Orders',
          value: 'order'
        },
        {
          label: 'Ticket Levels',
          value: 'ticket_level'
        },
        {
          label: 'Tickets',
          value: 'ticket'
        },
        // {
        //   label: 'Data',
        //   value: 'data'
        // },
      ]
    }
  },
  methods: {
    getLink(){
      return `http://${location.host}/event/ticket/${this.$route.params.id}`
    },
    copyLink(){
      const link = this.getLink()
      navigator.clipboard.writeText(link);
      this.$toast.show('Link copied')
      console.log(link)
    },
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
    toggleTicketLevel(ticketLevel) {
      if(this.$store.state.ticket_levels.filter((e => e.is_available)).length == 1){
        this.$toast.push("One Ticket level must be active")
      }
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
    async deleteEvent() {
      const con = confirm("This cannot be undone, Are you sure you want to delete?")

      if (!con)
        return

      this.$widget.openLoading()
      const res = await this.deleteEventService(this.$route.params.id)
      if (res.success) {
        this.$toast.success("Event has been successfully deleted")
      }
      else
        this.$toast.error(res.data.error ?? "Event Could not be deleted")
      this.$widget.dismiss()

      this.$router.push('/events/user')
    },
    async publishEvent() {
      if (!this.$store.state.event.ticket_levels?.[0]) {
        this.$toast.error("Cannot Publish event without a ticket level")
        return;
      }
      this.$widget.openLoading()
      let is_publish = this.$store.state.event.is_publish == 1 ? 0 : 1

      const data = new FormData()
      data.append("is_publish", is_publish)

      await this.updateEventService({
        id: this.$route.params.id,
        data
      })
      console.log(is_publish)
      this.$widget.dismiss()
    },
    update() {
      this.$store.dispatch('getSingleEventService', this.$route.params.id)
      this.$store.dispatch('getTicketLevelService', this.$route.params.id)
    },
    ...mapActions([
      "createTicketLevelService", "updateTicketLevelService", "updateDiscountService", "createDiscountService",
      "deleteDiscountService", "deleteTicketLevelService", "deleteEventService", "updateEventService"
    ])
  },
  async created() {
    await this.$store.dispatch('getSingleEventService', this.$route.params.id)
    await this.$store.dispatch('getTicketLevelService', this.$route.params.id)
    await this.$store.dispatch('getTicketsService', this.$route.params.id)
    await this.$store.dispatch('getOrderSummaryService', this.$route.params.id)
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
}
</style>

<style>
.p-button.p-component {
  margin-right: 10px;
  border-radius: 7px;
  background-color: whitesmoke;
  color: var(--bs-blue);

  border: none;
}

.p-button-label {
  font-size: 12px;
}

.p-button.p-component.p-highlight,
.p-button.p-component.p-highlight:hover {
  background-color: var(--bs-warning) !important;
  color: white;
  font-family: Poppins-Bold;
  box-shadow: none;
}
</style>