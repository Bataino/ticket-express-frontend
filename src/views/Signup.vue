<template>
    <div class="p-4">
        <bw-header :type='1'></bw-header>
        <div class="d-flex">
            <div class="w-75 text-center pt-3">
                <h5 class="text-primary bold">SignUp</h5>
                <div class="text-start p-3 px-md-5 pt-4">
                    <div class="border p-3 px-3 small rounded-7 d-flex align-items-center">
                        <icon icon="flat-color-icons:google" class="fs-3" />
                        <span class="ms-5">Sign in with google</span>
                    </div>

                    <div class="py-3 small text-center">
                        OR
                    </div>

                    <div class="row">
                        <div class="col-12 col-md-6">
                            <div class="">
                                <label class="small fw-bold">First Name</label>
                                <pv-inputtext :class="inputClass" placeholder="John"></pv-inputtext>
                            </div>
                        </div>
                        <div class="col-12 col-md-6">
                            <div class="">
                                <label class="small fw-bold">Last Name</label>
                                <pv-inputtext :class="inputClass" placeholder="Doe"></pv-inputtext>
                            </div>
                        </div>
                    </div>
                    <div class="">
                        <label class="small fw-bold">Phone Number</label>
                        <pv-inputtext :class="inputClass" placeholder="+23470229933"></pv-inputtext>
                    </div>
                    <div class="">
                        <label class="small fw-bold">Email address</label>
                        <pv-inputtext :class="inputClass" type="email" placeholder="jhonedoe@email.com"></pv-inputtext>
                    </div>
                    <div class="row">
                        <div class="col-12 col-md-6">
                            <div class="">
                                <label class="small fw-bold">Password</label>
                                <password class="inputClass mt-1" placeholder="****" toggleMask />
                            </div>
                        </div>
                        <div class="col-12 col-md-6">
                            <div class="">
                                <label class="small fw-bold">Referral(Optional)</label>
                                <pv-inputtext :class="inputClass" placeholder=".Doe"></pv-inputtext>
                            </div>
                        </div>
                    </div>
                    <div class="text-center small py-3">
                        Already have an account? <a href="/login" class="text-primary">Login</a>
                    </div>
                    <button class="rounded-7 border-0 fw-bold mt-2 btn-primary w-100 p-3 shadow-md">
                        Get started
                    </button>
                </div>
            </div>
            <div class="p-2 d-none d-md-block">
                <div class="w-100 my-5">
                    <img src="/images/3d-hands-holding-cash.png" class="w-100"/>
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
.rounded-7{
    border-radius: 7px;
}
</style>