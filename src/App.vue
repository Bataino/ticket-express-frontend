<template>
  <!-- <ConfirmPopup></ConfirmPopup> -->
  <div style="">
    <router-view />
  </div>
</template>

<style></style>

<script>
import moment from "moment"

export default {
  methods: {
    autoLogout() {
      if (this.$store.getters.token && !localStorage.getItem('timeLogin')) {
        localStorage.setItem("timeLogin", new Date())
        return
      }

      let now =  moment(new Date())
      let loginTime =  moment(localStorage.getItem("timeLogin"))

      let duration = moment.duration(now.diff(loginTime))

      console.log(duration.asMinutes())
      if(duration.asMinutes() > 10) {
        localStorage.clear()
        
        location.href = "/login"
      } 
    }
  },
  async created() {
    this.autoLogout()
  }
}

</script>
<script setup>
// import ConfirmPopup from 'primevue/confirmpopup';
</script>