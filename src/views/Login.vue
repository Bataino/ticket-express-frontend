<template>
    <div class="p-4">
        <bw-header :type='1'></bw-header>
        <div class="d-flex">
            <div class="w-100 text-center pt-3">
                <h5 class="text-primary bold">SignUp</h5>
                <div class="text-start p-3 px-md-5 pt-4">
                    <div class="border p-3 px-3 small rounded-7 d-flex align-items-center">
                        <icon icon="flat-color-icons:google" class="fs-3" />
                        <span class="ms-5">Sign in with google</span>
                    </div>

                    <div class="py-3 small text-center">
                        OR
                    </div>
                    <div class="">
                        <label class="small fw-bold">Email Address</label>
                        <pv-inputtext :class="inputClass" placeholder="+23470229933"></pv-inputtext>
                    </div>
                    <div class="">
                        <label class="small fw-bold">Email address</label><br>
                        <password class="inputClass mt-1 w-100 position-relative" placeholder="****" toggleMask :feedback="false"  />
                    </div>
                    <div class="text-center small pt-3">
                        <a href="/login" class="text-danger">Forgot Password?</a>
                    </div>
                    <div class="text-center small pt-3 mt-5">
                        Don't have an account? <a href="/login" class="text-primary">Signup</a>
                    </div>
                    <button class="rounded-7 border-0 fw-bold mt-2 btn-primary w-100 p-3 shadow-md">
                        Login
                    </button>
                </div>
            </div>
            <div class="p-2 d-none d-md-block">
                <div class="w-100 my-5">
                    <img src="/images/guy-playing-game.png" class="w-100"/>
                    <div class="float-end mt-4 bold text-primary">
                        Make your Life with Us!
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import Password from 'primevue/password';
</script>

<script>
    export default {
        data(){
            return {   
                inputClass:"w-100 mt-1 mb-3 p-2 small border"
            }
        }
    }
</script>

<style>
input {
    min-height: 50px !important;
    border-radius:7px;
}
.p-inputtext {
    width: 100%;
}
</style>