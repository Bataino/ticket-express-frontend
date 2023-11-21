
<template>
    <div>
        <div class="d-flex  justify-content-between mb-3" @click="visible = true">
            <div>
                <span>
                    Event: Summary and stuff
                </span>
                <div class="py-2 text-muted small">
                    <span class="small">27/10/2009</span>
                </div>
            </div>
            <div class="text-success bold">
                +$20,000
            </div>
        </div>
        <Dialog modal v-model:visible="visible" header="Transaction Details">
            <div class="p-3 p-md-3 w-100 text-nowrap">
                <div class="fw-bold">
                    Card Usage
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
import Dialog from "primevue/dialog";
</script>


<script>
export default {
    name: "Transaction",
    props: ['data'],
    data() {
        return {
            visible: false,
            classes: [
                'd-flex w-100 py-3'
            ]
        }
    }
}
</script>
