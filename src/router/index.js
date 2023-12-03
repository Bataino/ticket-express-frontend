import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import store from '../store'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: function () {
      return import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
    }
  },
  {
    path: '/views',
    component:  () => import('@/views/Views.vue')
    
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login.vue')
  },
  {
    path: '/signup',
    name: 'signup',
    component: () => import('@/views/Signup.vue')
  },
  {
    path: '/events/user',
    name: 'user_event',
    component: () => import('@/views/event/UserEvents.vue')
  },
  {
    path: '/event/add',
    name: 'add_event',
    component: function () {
      return import('@/views/event/AddEvent.vue')
    }
  },
  {
    path: '/event/edit/:id',
    name: 'edit_event',
    component: function () {
      return import('@/views/event/EditEvent.vue')
    }
  },
  {
    path: '/event/:id',
    name: 'event_details',
    component: function () {
      return import('@/views/event/EventDetails.vue')
    }
  },
  {
    path: '/orders',
    name: 'orders',
    component: function () {
      return import('@/views/Orders.vue')
    }
  },
  {
    path: '/orders/:event_id',
    name: 'event_orders',
    component: function () {
      return import('@/views/Orders.vue')
    }
  },
  {
    path: '/campaigns',
    name: 'campaigns',
    component: function () {
      return import('@/views/campaign/Campaign.vue')
    }
  },
  {
    path: '/campaign/id',
    name: 'campaign_details',
    component: function () {
      return import('@/views/campaign/CampaignDetails.vue')
    }
  },
  {
    path: '/venues',
    name: 'venues',
    component: function () {
      return import('@/views/venue/Venues.vue')
    }
  },
  {
    path: '/venue/add',
    name: 'add_venue',
    component: function () {
      return import('@/views/venue/AddVenue.vue')
    }
  },
  {
    path: '/venue/edit/id',
    name: 'edit_venue',
    component: function () {
      return import('@/views/venue/EditVenue.vue')
    }
  },
  {
    path: '/profile',
    name: 'profile',
    component: function () {
      return import('@/views/profile/Profile.vue')
    }
  },
  
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

const protected_routes = ["profile",  "home", "edit_venue", "venues",  "add_event", "user_event",
  "add_venue", "campaign_details", "campaigns","orders", "event_orders", "event_details", "edit_event"
];

const auth_routes = ["login", "signup"];

router.beforeEach((to, from) => {
  if(protected_routes.includes(to.name) && !store.getters.token){
    return {
      name:'login'
    }
  }
  else if(auth_routes.includes(to.name) && store.getters.token){
    return {
      name:'home'
    }
  }
})

export default router
