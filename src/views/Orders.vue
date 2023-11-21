<template>
  <div class="">
    <te-header />
    <div class="p-3">
      <div class="border rounded-7 p-2">
        <DataTable :value="orders" scrollable scrollHeight="400px" tableStyle=""
          :virtualScrollerOptions="{ lazy: true, onLazyLoad: loadCarsLazy, itemSize: 46, delay: 200, showLoader: true, loading: lazyLoading, numToleratedItems: 10 }"
          @row-click="showOrder"
          :filters="filters"
          >
          <Column field="id" header="Id" style="width: 20%">
            <template #loading>
              <div class="flex align-items-center" :style="{ height: '17px', 'flex-grow': '1', overflow: 'hidden' }">
                <Skeleton width="60%" height="1rem" />
              </div>
            </template>
          </Column>
          <Column field="price" header="Price" style="width: 20%">
            <template #loading>
              <div class="flex align-items-center" :style="{ height: '17px', 'flex-grow': '1', overflow: 'hidden' }">
                <Skeleton width="40%" height="1rem" />
              </div>
            </template>
          </Column>
          <Column field="event" header="Event" style="width: 20%">
            <template #loading>
              <div class="flex align-items-center" :style="{ height: '17px', 'flex-grow': '1', overflow: 'hidden' }">
                <Skeleton width="30%" height="1rem" />
              </div>
            </template>
          </Column>
          <Column field="tickets" header="Tickets" style="width: 20%">
            <template #loading>
              <div class="flex align-items-center" :style="{ height: '17px', 'flex-grow': '1', overflow: 'hidden' }">
                <Skeleton width="40%" height="1rem" />
              </div>
            </template>
          </Column>
        </DataTable>
      </div>
    </div>
    <Dialog modal v-model:visible="visible" header="Transaction Details">
      <div class="p-3 p-md-3 w-100 text-nowrap">
        <div class="fw-bold">
          Summary
          <hr />
        </div>
        <div :class="classes[0]">
          <div class="w-50 pe-5">
            Date
          </div>
          <div class="text-nowrap text-end">
            20-08-2003
          </div>
        </div>
        <div :class="classes[0]">
          <div class="w-50 pe-5">
            Transaction ID
          </div>
          <div class="text-nowrap text-end">
            20082003773829012
          </div>
        </div>
        <div :class="classes[0]">
          <div class="w-50 pe-5">
            Destination
          </div>
          <div class="text-nowrap text-end">
            9066299190
          </div>
        </div>
        <hr />
        <div class="text-end text-secondary pt-3">
          <icon icon="bxs:copy" class="fs-4" />
          <icon icon="ri:share-line" class="ms-2 fs-4" />
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
      visible:false,
      orders: [
        { id: 2, event: "ODS", tickets: 34, price: 234 },
        {}
      ]
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
