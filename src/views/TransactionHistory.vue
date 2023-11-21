<template>
  <div class="h1">
    <side-bar-layout>
      <div class="px-3 px-md-5 w-100">
        <pv-inputtext placeholder="search"></pv-inputtext>
        <div class="border p-3 my-4 pt-4 rounded-7">
          <span class="fw-bold mb-4">Transaction History</span><br><br />
          <transaction v-for="b in [1, 2, 4, , , , , , ,]" :key="b" >
          </transaction>
        </div>
      </div>
    </side-bar-layout>
  </div>
</template>

<script setup>
import SideBarLayout from '@/layout/SideBarLayout.vue';
import Transaction from "@components/Transaction.vue";
</script>

<script>
// @ is an alias to /src

export default {
  name: 'HomeView',
  components: {
  },
  data() {
    return {
      classes: [
      ]
    }
  }
}
</script>
