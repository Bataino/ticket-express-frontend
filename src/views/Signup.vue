<template>
    <div class="">
        <te-header type='not_login'></te-header>
        <div class="d-flex p-4 pt-5">
            <div class="col-12 col-md-6 text-start">
                <h5 class="text-primary bold">SignUp</h5>
                <form class="text-start py-4" @submit.prevent="signup">
                    <div class="row">
                        <div class="col-12 col-md-6">
                            <div class="">
                                <label class="small fw-bold">First Name</label>
                                <pv-inputtext required v-model="user.first_name" :class="inputClass"
                                    placeholder="John"></pv-inputtext>
                            </div>
                        </div>
                        <div class="col-12 col-md-6">
                            <div class="">
                                <label class="small fw-bold">Last Name</label>
                                <pv-inputtext required v-model="user.last_name" :class="inputClass"
                                    placeholder="Doe"></pv-inputtext>
                            </div>
                        </div>
                    </div>
                    <div class="">
                        <label class="small fw-bold">Email address</label>
                        <pv-inputtext :class="inputClass" v-model="user.email" type="email"
                            placeholder="jhonedoe@email.com"></pv-inputtext>
                    </div>
                    <div class="">
                        <label class="small fw-bold">Phone Number</label>
                        <input type="tel" inputmode="numeric" :class="inputClass" v-model="user.phone" placeholder="+23470229933"
                            required>
                    </div>
                    <div class="row">
                        <div class="col-12 col-md-6">
                            <div class="">
                                <label class="small fw-bold">Password</label><br>
                                <password class="mb-3 mt-1" v-model="user.password" placeholder="****" required
                                    toggleMask />
                            </div>
                        </div>
                        <div class="col-12 col-md-6">
                            <div class="">
                                <label class="small fw-bold">Confirm Password</label><br>
                                <password class=" mt-1" v-model="user.password_confirmation" placeholder="****"
                                    :feedback="false" toggleMask required />
                                <div class="text-danger small mt-1 mb-3 bold" v-if="!passwordMatch">
                                    Password does not match!
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="text-center small py-3">
                        Already have an account? <a href="/login" class="text-primary">Login</a>
                    </div>
                    <div class="text-danger text-center small mt-1 mb-3 bold" v-if="error">
                        {{ error }}
                    </div>
                    <button type="submit" :disabled="!vefComplete" class="rounded-7 border-0 fw-bold mt-2 btn-primary w-100 p-3 shadow-md">
                        Get started
                    </button>
                </form>
            </div>
            <div class="p-2 d-none d-md-block">
                <div class="w-100 my-5">
                    <img src="@assets/images/events.jpg" class="w-100" />
                    <div class="float-end mt-4 bold text-primary">
                       Event Hosting Got Easier!
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
    computed: {
        passwordMatch() {
            return this.user.password && this.user.password == this.user.password_confirmation
        },
        vefComplete() {
            const vefComplete = this.passwordMatch && Object.values(this.user).length == 6
            if (vefComplete)
                return true
            else
                return false
        }
    },
    data() {
        return {
            user: {},
            inputClass: "w-100 mt-1 mb-3 p-2 small border",
            error: ""
        }
    },
    methods: {
        async signup() {
            if (!this.vefComplete)
                this.$toast.error("Check Your Inputs and try again!")

            this.$widget.openLoading()
            const res = await this.$store.dispatch('signupService', this.user)
            // console.log("res", res)
            this.$widget.dismiss()
            if (!res.success) {
                this.error = this.$widget.getValidationError(res.errorMessage, "Could not register user")
                this.$toast.error(this.error)
                return
            }
            location.href = '/dashboard'
        }
    }
}
</script>

<style>
input {
    min-height: 50px !important;
    border-radius: 7px;
}

.rounded-7 {
    border-radius: 7px;
}

.p-component.p-password,
.p-password-input {
    width: 100% !important;
}</style>