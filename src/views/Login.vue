<template>
    <div class="p-4">
        <te-header type='not_login'></te-header>
        <div class="d-flex w-100">
            <div class="w-100 w-md-50 text-center pt-5">
                <h5 class="text-primary bold">Login</h5>
                <form class="text-start p-3 px-md-5 pt-4" @submit.prevent="login">
                    <div class="text-start text-danger mb-2 d-none bold" ref="loginError">Email or Password Incorrect, Try
                        again!</div>
                    <div class="">
                        <label class="small fw-bold">Email Address</label>
                        <pv-inputtext :class="inputClass" v-model="user.email"
                            placeholder="jondoe@example.com"></pv-inputtext>
                    </div>
                    <div class="">
                        <label class="small fw-bold">Password</label><br>
                        <password class="inputClass mt-1 w-100 position-relative" v-model="user.password" placeholder="****"
                            toggleMask :feedback="false" />
                    </div>
                    <div class="text-center small pt-3">
                        <a href="#" class="text-danger">Forgot Password?</a>
                    </div>
                    <div class="text-center small pt-3 mt-5">
                        Don't have an account? <a href="/signup" class="text-primary">Signup</a>
                    </div>
                    <button class="rounded-7 border-0 fw-bold mt-2 btn-primary w-100 p-3 shadow-md">
                        Login
                    </button>
                </form>
            </div>
            <div class="p-2 w-100 d-none d-md-block">
                <div class="w-100 my-5">
                    <img src="https://www.shutterstock.com/image-illustration/3d-young-man-marker-checking-260nw-2329113415.jpg"
                        class="w-100" />
                    <div class="float-end mt-4 bold text-primary">
                        Start Selling Tickets in Minutes!
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
    data() {
        return {
            inputClass: "w-100 mt-1 mb-3 p-2 small border",
            user: {
                password: '',
                email: ''
            }
        }
    },
    methods: {
        async login() {
            this.$widget.openLoading()
            // console.log(this.$store)

            const login = await this.$store.dispatch('loginService', this.user)
            this.$widget.dismiss()

            if (login.response) {
                this.$refs.loginError.classList.remove('d-none')
                this.$toast.error('Invalid Login Credentials')
                return
            }
            // console.log(login)
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

.p-inputtext {
    width: 100%;
}</style>