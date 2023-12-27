
<template>
    <div class="mw-100">
        <div class="d-flex align-items-center justify-content-between p-2 pb-3 shadow-sm" v-if="type == 'not_login'">
            <div class="d-flex">
                <div class="p-2">
                    <img src="@assets/images/logo.jpg" width="200">
                </div>
            </div>
            <div class="small pe-md-4">
                <router-link class="p-2 px-3 px-sm-4" to="/login">
                    Login
                </router-link>
                <router-link class="p-2 px-3 bg-primary border-0 px-sm-4 bg-gradient rounded-20 text-white" to="/signup">
                    Signup
                </router-link>
            </div>
        </div>
        <div class="d-flex align-items-center justify-content-between p-2 pb-3 shadow-sm" v-else>
            <div class="d-flex">
                <pv-button class="text-primary fw-bold d-md-none me-4" icon="pi pi-bars"
                    @click="visible = true"></pv-button>
                <div class="p-2 me-3">
                    <img src="@assets/images/logo.jpg" width="200">
                </div>
                <span class="align-items-center ps-5 d-none d-md-flex">
                    <router-link to="/dashboard" class="me-3 ">DashBoard</router-link>
                    <router-link to="/events/user" class="me-3">Events</router-link>
                    <!-- <router-link to="/campaigns" class="me-3">Campaigns</router-link> -->
                    <!-- <router-link to="/policy" class="me-3">Policy & Refunds</router-link> -->
                    <router-link to="/venues" class="">Venues</router-link>
                </span>
            </div>
            <button
                class="text-lg-nowrap d-flex align-items-center bg-transparent text-dark border-0 justify-content-end pe-3"
                @click="toggle" aria-haspopup="true" aria-controls="overlay_menu_setting">
                <div class="rounded-circle p-3 w-fit me-2 bg-danger"></div>
                {{ $store.state.user.first_name }} {{ $store.state.user.last_name }}
            </button>
            <!-- <Button type="button" icon="pi pi-ellipsis-v"/> -->
            <Menu ref="menu" id="overlay_menu_setting" :model="items" :popup="true" class="small border">
            </Menu>
            <!-- <Menu ref="eventMenu" id="overlay_menu_event" :model="[...$store.state.events.slice(0,5)]" :popup="true" >
                <template #item="{item,props}" >
                    <a href="" class="p-3" style="min-height: 30px;">
                        {{ item.title }}
                    </a>
                </template>
            </Menu> -->
        </div>
        <side-bar v-model:visible="visible">
            <div class="px-5">
                <router-link to="/dashboard" class="me-3 ">DashBoard</router-link><br><br>
                <router-link to="/events/user" class="me-3 mb-4">Events</router-link><br><br>
                <!-- <router-link to="/orders" class="me-3 mb-4">Orders</router-link><br><br> -->
                <!-- <router-link to="/campaigns" class="me-3 mb-4">Campaigns</router-link><br><br> -->
                <!-- <router-link to="/policy" class="me-3 mb-4">Policy & Refunds</router-link><br><br> -->
                <router-link to="/venues" class="">Venues</router-link>
            </div>
        </side-bar>
    </div>
</template>

<script setup>
import { ref } from "vue";
import Menu from "primevue/menu"
import SideBar from "primevue/sidebar"

const visible = ref(false);
const menu = ref();
const eventMenu = ref('eventMenu');

const toggleEvent = (event) => {
    eventMenu.value.toggle(event);
};
const toggle = (event) => {
    menu.value.toggle(event);
};
</script>


<script>
export default {
    name: "Header",
    props: ['type'],
    data() {
        return {
            visible: false,
            items: [
                {
                    label: 'Profile',
                    icon: 'pi pi-user',
                    url: "/profile"
                },
                {
                    label: 'Logout',
                    icon: 'pi pi-sign-out',
                    command: () => this.logout()
                }
            ],
            events: [
                {
                    label: 'View all events',
                    class: "small",
                    to: "/event/id"
                },
                {
                    label: 'Event 1',
                    to: "/event/id"
                },
                {
                    label: 'Event 2',
                }
            ]
        }
    },
    methods: {
        logout() {
            console.log('log att')
            localStorage.clear()
            this.$store.commit('deleteLocal', 'token')
            location.href = '/login'
        }
    },
    async beforeMount() {
        if (!this.$store.state.user.id)
            await this.$store.dispatch("getUserService")
    }
}
</script>

<style>
.p-menu {
    padding: 0px;
    max-width: 200px !important;
    margin-top: 5px;
}

.p-menu-list {
    padding: 0px;
}

.p-menuitem-link {
    text-decoration: none;
}
</style>