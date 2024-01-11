<template>
  <div class="h-100 w-100">

    <div class="overflow-hidden bg-transparent text-secondary" style="">
      <qrcode-stream class="rounded w-100 position-relative" @detect="onDetect"
        style="min-height:400px;object-fit: cover;">
        <div class="position-absolute">
          <div class="rounded qr-border mx-auto" style=""></div>
        </div>
      </qrcode-stream>
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
      ticket: {},
      buttons: [

        {
          title: "Home",
          icon: "home.svg",
          link: this.$url + "home"
        },
        {
          title: "Scan",
          icon: "scan.jpg",
          link: this.$url + "scan"
        },
        {
          title: "Tickets",
          icon: "attendees.jpg",
          link: this.$url + "find"
        },
      ]
    }
  },
  methods: {
    async onDetect(id) {
      this.$widget.playBlimp()
      id = id[0].rawValue
      console.log(id)

      if (id) {
        this.$widget.openLoading()
        const res = await this.scanTicketService(id)
        this.ticket = res.data.data
        this.$widget.dismiss()
        if (res.success) {
          this.$toast.success("TICKET COULD BE FOUND!")
          return
        }

        if (!res.success) {
          this.$toast.error("TICKET INVALID!")
          this.$widget.playBuzz()
        }

        this.$router.push({
          name: "ScanCompleted"
        })

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
  min-width: 400px !important;
  min-height: 400px;
  left: auto;
  top: auto;
  /* background-image: url('https://www.nicepng.com/png/full/426-4264340_border-for-qr-code-area-parallel.png'); */
  background-repeat: no-repeat;
  background-position: center;
  background-image: url('../../assets/images/scan.svg');
  background-size: 500px;
  /* margin-top: 10% !important; */
}

canvas.qrcode-stream-overlay {
  display: none !important;
}

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
