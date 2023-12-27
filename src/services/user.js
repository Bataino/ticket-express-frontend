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
    async signupService(store, data){
        const res = await http.post('register', data)
        if(res.data?.success){
            store.commit("updateLocal", ['token', res.data.data.token])
            store.commit("update", ['user', res.data.data.user])
            return res.data
        }
        return res.response.data
    },
    async getUserService(store){
        const res = await http.get('user')
        if(res.data?.success){
            store.commit("update", ['user', res.data.data])
            return res.data
        }
        return res.response.data
    }
}