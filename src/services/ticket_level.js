import http from "./http"

export default {
    // async getUserEventService(store, data) {
    //     const res = await http.get('event/user', data)
    //     if (res.data?.success) {
    //         store.commit("update", ['events', res.data.data])
    //     }
    //     return res.data
    // },
    async createTicketLevelService({ commit }, data) {
        const res = await http.post('level', data)
        if (res.response)
            return res.response
        return res.data
    },
    async deleteTicketLevelService({ commit }, id) {
        const res = await http.delete('level/'+id)
        if (res.response)
            return res.response
        return res.data
    },
    async updateTicketLevelService({ commit }, {data, id}) {
        const res = await http.put('level/'+id, data)
        if (res.response)
            return res.response
        return res.data
    },
    
}