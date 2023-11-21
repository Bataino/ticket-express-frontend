<template>
    <div class="p-4">
        <bw-header :type='2'></bw-header>
        <div class="px-5 mx-md-5 pt-2">
            <div class="d-flex mx-5 w-100 border-bottom">
                <div class="pt-1 bg-primary w-50"></div>
                <div class="pt-1 bg-primary w-50" v-if="$route.params.stage=='phone'"></div>
            </div>
        </div>
        <div class="text-center" v-if="$route.params.stage!='phone'">
            <div class="fs-4 bold pt-4 pb-3 mt-3 text-primary">
                Verify Account
            </div>
            <span>
                We have sent you a verification Email. Confirm your account on your mail and start enjoying the benefits with us.
            </span><br>
            <button class="btn btn-primary rounded-7 px-5 mt-5 py-3">
                <span class="px-5 small">
                    Confirm Mail
                </span>
            </button> 
            <div class="text-center small pt-3 mt-5">
                Not Recieved Yet? <a href="/resend Mail" class="text-primary">Resend</a>
            </div>
        </div>
        <div class="text-center" v-else>
            <div class="fs-4 bold pt-4 pb-3 mt-3 text-primary">
                Verify Phone Number
            </div>
            <span>
                We have sent a verification code to your phone number. Check for the 4 digit number sent from us and start to enjoy Capidot.
            </span><br>

            <div class="text-start w-100 d-flex mt-5 align-items-center">
                <div class="w-fi mx-auto" style="width: 300px;">
                    <label>Phone Number</label><br>
                    <input type="tel" class="border mt-2 px-4 w-100" value="09066299290" disabled />
                </div>
            </div>

            <div class="text-start w-100 d-flex mt-4 align-items-center">
                <div class="mx-auto" style="width: 300px;">
                    <label>4 Digit Code</label><br>
                    <input type="tel" class="border mt-2 px-4 w-100" min="4" max="4"  placeholder="****" />
                </div>
            </div>
            <div class="text-center small pt-4">
                Not Recieved Code Yet? <a href="/resend Mail" class="bold text-primary">Resend Code</a>
            </div>
            <button class="btn btn-primary rounded-7 px-5 mt-5 py-3">
                <span class="px-sm-5 mx-md-5 small">
                    Complete verification
                </span>
            </button> 
        </div>
    </div>
</template>

<script setup>
import Password from 'primevue/password';
</script>

<script>
export default {
    data() {
        return {
            inputClass: "w-100 mt-1 mb-3 p-2 small border"
        }
    }
}
</script>

<style>
input {
    min-height: 50px !important;
    border-radius: 7px;
}

.p-inputtext {
    width: 100%;
}
</style>