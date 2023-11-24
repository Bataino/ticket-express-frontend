
<template>
    <div class="">
        <div class="d-flex align-items-center justify-content-between p-2 pb-3 shadow-sm">
            <div class="d-flex">
                <pv-button class="text-primary fw-bold d-md-none me-4" icon="pi pi-bars"
                    @click="visible = true"></pv-button>
                <div class="border px-3 p-2 me-3 w-fit">
                    Logo
                </div>
                <span class="align-items-center ps-5 d-none d-md-flex">
                    <router-link to="/" class="me-3 ">DashBoard</router-link>
                    <div class="me-3" @click="toggleEvent" aria-haspopup="true" aria-controls="overlay_menu_event">Events
                    </div>
                    <router-link to="/orders" class="me-3">Orders</router-link>
                    <router-link to="/campaign" class="me-3">Campaigns</router-link>
                    <router-link to="/policy" class="me-3">Policy & Refunds</router-link>
                    <router-link to="/venues" class="">Venues</router-link>
                </span>
            </div>
            <button
                class="text-lg-nowrap d-flex align-items-center bg-transparent text-dark border-0 justify-content-end pe-3"
                @click="toggle" aria-haspopup="true" aria-controls="overlay_menu_setting">
                <div class="rounded-circle p-3 w-fit me-2 bg-danger"></div>
                John Doe
            </button>
            <!-- <Button type="button" icon="pi pi-ellipsis-v"/> -->
            <Menu ref="menu" id="overlay_menu_setting" :model="items" :popup="true" class="small border" />
            <Menu ref="eventMenu" id="overlay_menu_event" :model="events" :popup="true" />
        </div>
        <side-bar v-model:visible="visible">
            <div class="px-5">
                <router-link to="/" class="me-3 mb-4 ">DashBoard</router-link>
                <div class="me-3 mb-4" @click="toggleEvent" aria-haspopup="true" aria-controls="overlay_menu_event">Events
                </div>
                <router-link to="/orders" class="me-3 mb-4">Orders</router-link>
                <router-link to="/campaign" class="me-3 mb-4">Campaigns</router-link>
                <router-link to="/policy" class="me-3 mb-4">Policy & Refunds</router-link>
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
                    icon: 'pi pi-user'
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
                    class:"small",
                    to:"/event/id"
                },
                {
                    label: 'Event 1',
                    to:"/event/id"
                },
                {
                    label: 'Event 2',
                }
            ]
        }
    },
    methods: {
        logout(){
            this.$store.commit('deleteLocal', 'token')
            this.$router.push('/login')
        }
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