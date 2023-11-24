import http from "./http"

export default {
    async getUserEventService(store, data){
        const res = await http.get('event/user', data)
        if(res.data?.success){
            store.commit("update", ['events', res.data.data])
        }
        return res
    },
    async logoutService(store, data){
        
    }
}