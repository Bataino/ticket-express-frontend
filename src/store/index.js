import { createStore } from 'vuex'
import userServices from "@/services/user"
import eventServices from "@/services/event"
import venueServices from "@/services/venue"

export default createStore({
  state: {
    user: null,
    token: null,
    events: [],
    tickets: [],
    campaigns: [],
    venues: [],
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
    ...venueServices
  },
  modules: {
  }
})

