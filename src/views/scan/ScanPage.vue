<template>
  <div class="w-100 d-flex align-items-center justify-content-center" style="min-height: 100vh;">
    <div class="fixed-top bg-white p-3 h4 bold mt-2">
      <icon icon="fa:chevron-left" class="me-4" @click="$router.go(-1)"/>
      Scan Page
    </div>
    <div class="overflow-hidden py-5 mt-3 mt-md-0 bg-transparent text-secondary w-100 p-3 row" style="">
      <div class="col-12 col-md-6">
        <qrcode-stream class="_d-none _d-md-flex rounded position-relative" @detect="onDetect"
          style="min-height:400px;object-fit: cover;">
          <div class="position-absolute w-100 h-100 mx-auto p-3 --bg-success" style="top:0;right:0">
            <div class="rounded qr-border w-100 p-4 mx-auto" style=""></div>
          </div>
        </qrcode-stream>
      </div>
      <div class="col-12 col-md-6" v-if="ticket">
        <div class="w-100 py-5 mt-3 mt-md-0 d-flex justify-content-center h-100" :style="`background-color:${isScannedSuccess ? 'rgb(18, 201, 18)' : 'red'}`">
          <div class="text-white mt-2 w-100">
            <div class="fs-4 fw-bold w-100 text-center"> {{ ticket.ticket_level.title }} </div><br>
            <div class=" d-flex justify-content-center flex-wrap w-100 mt-3">
              <icon icon="simple-line-icons:check" v-if="isScannedSuccess" width="100" class="text-white" />
              <icon icon="ic:outline-cancel" v-else width="100" class="text-white" />
              <div class="mt-4 w-100 text-center">
                <span class="fs-4 my-1" v-if="isScannedSuccess">
                  Valid Ticket
                </span>

                <span class="fs-4 my-1" v-else>
                  InValid Ticket
                </span><br><br>
                <span class="mt-4">
                  {{ ticket.user.first_name }} {{ ticket.user.last_name }}<br>
                  {{ ticket.id }}
                </span><br />
              </div>
              <div class="w-100 bg-white my-5" style="min-width: 100vvw ;min-height: 2px;"> </div>
              <div class="p-2">
                <div
                  class="px-5 p-2 d-flex align-items-center justify-content-center bg-white text-success text-uppercase btn fw-bold"
                  style="border-radius: 20px;" v-if="isScannedSuccess">
                  <icon icon="fa:check" class="me-1"></icon> Checked-in
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-12 col-md-6" v-else-if="scanningComplete && !ticket">
        <div class="w-100 py-5 d-flex justify-content-center h-100" :style="`background-color:${isScannedSuccess ? 'rgb(18, 201, 18)' : 'red'}`">
          <div class="text-white mt-2 w-100">
            <div class=" d-flex justify-content-center flex-wrap w-100 mt-3">
              <icon icon="simple-line-icons:check" width="100" class="text-white" />
              <div class="mt-4 w-100 text-center">
                <span class="fs-3 my-1" >
                  Ticket not Found
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup >
import { IonContent, IonHeader, IonPage, IonTitle, IonModal, IonToolbar, IonButtons, IonBackButton, IonText } from '@ionic/vue';
import { QrcodeStream, QrcodeDropZone, QrcodeCapture } from 'vue-qrcode-reader'
import { Icon } from "@iconify/vue"

</script>

<script >
import http from "@/services/http.js"
import { defineComponent } from 'vue';
import { mapActions } from 'vuex';

export default defineComponent({
  data() {
    return {
      ticket: null,
      isScannedSuccess: false,
      scanningComplete: false
    }
  },
  methods: {
    async onDetect(id) {
      this.$widget.playBlimp()
      id = id[0].rawValue
      console.log("ID", id)

      if (id) {
        this.$widget.openLoading()

        const res = await this.scanTicketService({id, event_id: this.$route.params.event_id})
        this.scanningComplete = true
        this.ticket = res.data ?? res.errorMessage

        console.log(this.ticket)

        this.$widget.dismiss()
        if (res.success) {
          this.isScannedSuccess = res.success
          this.$toast.success("TICKET COULD BE FOUND!")
          return
        }

        if (!res.success) {
          this.$toast.error("TICKET INVALID!")
          this.$widget.playBuzz()
        }

        return;
      }

      this.$toast.push("INVALID QRCODE")
    },
    moveToHistory() {
      this.$router.push('/scan/history')
    },
    ...mapActions(["scanTicketService"])
  },
  mounted() {
    // console.log(new URL('../assets/buzz.mp3', import.meta.url).href)
    // var audio = new Audio()
    // audio.play()
  }
})
</script>

<style>
ion-button,
ion-button:active,
ion-button:hover {
  --border-radius: 50%;
  --box-shadow: 0px 4px 1px rgb(197, 197, 197) !important;
  width: 90px !important;
  height: 90px;
}

.qr-border {
  min-width: 100% !important;
  min-height: 100%;
  /* position: absolute; */
  /* left: auto; */
  /* top: auto; */
  /* background-image: url('https://www.nicepng.com/png/full/426-4264340_border-for-qr-code-area-parallel.png'); */
  background-repeat: no-repeat;
  background-position: center;
  background-image: url('../../assets/images/scan.svg');
  background-size: 300px;
  /* margin-top: 10% !important; */
}

/* canvas.qrcode-stream-overlay {
  display: none !important;
} */

.qrcode-stream-wrapper {
  width: 100%;
  overflow: hidden;
  min-height: 100%;
  max-width: 600px;
  position: relative;

}

video.qrcode-stream-camera {
  object-fit: cover !important;
  object-position: top !important;
  position: absolute;
  max-width: 100%;
  min-height: 100%;
}
</style>
