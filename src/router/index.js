import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

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
    path: '/events/user',
    name: 'user_event',
    component: function () {
      return import('@/views/event/UserEvents.vue')
    }
  },
  {
    path: '/event/add',
    name: 'add_event',
    component: function () {
      return import('@/views/event/AddEvent.vue')
    }
  },
  {
    path: '/event/edit/id:',
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
    path: '/orders/:eventId',
    name: 'event_orders',
    component: function () {
      return import('@/views/Orders.vue')
    }
  },
  {
    path: '/campaigns',
    name: 'campaign',
    component: function () {
      return import('@/views/campaign/Campaign.vue')
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

export default router
