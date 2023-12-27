import http from "./http"

export default {
    async getVenueService(store, data) {
        const res = await http.get('venue')
        if (res.data?.success) {
            store.commit("update", ['venues', res.data.data])
        }
        return res
    },

    async createVenueService(store, data) {
        const res = await http.post('venue', data)
        if (res.data?.success) {
            return res.data
        }
        return res.response.data
    },
}