import http from "./http"

export default {
    async getVenueService(store, data){
        const res = await http.get('venue')
        if(res.data?.success){
            store.commit("update", ['venue', res.data.data])
        }
        return res
    },
}