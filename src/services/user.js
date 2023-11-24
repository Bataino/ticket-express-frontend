import http from "./http"

export default {
    async loginService(store, data){
        const res = await http.post('login', data)
        if(res.data?.success){
            store.commit("updateLocal", ['token', res.data.data.token])
            store.commit("update", ['user', res.data.data.user])
        }
        return res
    },
    async logoutService(store, data){
        
    }
}