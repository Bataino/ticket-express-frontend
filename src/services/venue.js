import http from "./http"

export default {
    async getVenueService(store, data) {
        const res = await http.get('venue')
        if (res.data?.success) {
            store.commit("update", ['venues', res.data.data])
        }
        return res
    },
    async getSingleVenueService(store, id) {
        const res = await http.get('venue/'+id)
        if(res.response){
            return res.response.data
        }
        // if (res.data?.success) {
        //     store.commit("update", ['venue', res.data.data])
        // }
        return res.data
    },
    async createVenueService(store, data) {
        const res = await http.post('venue', data)
        if (res.data?.success) {
            return res.data
        }
        return res.response.data
    },
    async updateVenueService(store, {id, venue}) {
        const res = await http.put('venue/'+id, venue)
        if (res.data?.success) {
            return res.data
        }
        return res.response.data
    },
}