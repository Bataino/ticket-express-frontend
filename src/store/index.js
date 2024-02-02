import { createStore } from 'vuex'
import userServices from "@/services/user"
import eventServices from "@/services/event"
import venueServices from "@/services/venue"
import ticketLevelServices from "@/services/ticket_level"
import discountServices from "@/services/discount"
import orderServices from "@/services/order"

const store = createStore({
  state: {
    user: {},
    attendees:["Less than 250","251 to 500", "501 to 1,000", "1,001 to 5,0001", "5,0001 to 10,000", "10,0000+"],
    token: null,
    events: [],
    tickets: [],
    ticket_levels: [],
    campaigns: [],
    venues: [],
    orderSummary:{},
    event:{
      venue:{}
    },
    orders:[],
    allOrders:{
      data:[]
    }
  },
  getters: {
    token(state) {
      return state.token ?? localStorage.getItem('token')
    }
  },
  mutations: {
    update(state, [name, value]) {
      state[name] = value
    },
    updateAttr(state, [name, attr, value]) {
      state[name][attr] = value
    },
    updateLocal(state, [name, value]) {
      state[name] = value
      localStorage.setItem(name, value)
    },
    deleteLocal(state, name ) {
      localStorage.removeItem(name)
    }
  },
  actions: {
    ...userServices,
    ...eventServices,
    ...venueServices,
    ...ticketLevelServices,
    ...discountServices,
    ...orderServices,
  },
  modules: {
  }
})

// store.subscribeAction((action, state) => {})

export default store

