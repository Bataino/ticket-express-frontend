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
    async getTicketLevelService({ commit }, id) {
        const res = await http.get('level/'+ id)
        if (res.response)
            return res.response

        commit("update", ["ticket_levels", res.data.data])
        return res.data
    },

    async deleteTicketLevelService({ commit }, id) {
        const res = await http.delete('level/' + id)
        if (res.response)
            return res.response
        return res.data
    },
    async updateTicketLevelService({ commit }, { data, id }) {
        const res = await http.put('level/' + id, data)
        if (res.response)
            return res.response
        return res.data
    },
    async getTicketsService({ commit }, id) {
        const res = await http.get('ticket/event/' + id)
        if (res.response)
            return res.response

        commit("update", ["tickets", res.data.data])
        return res.data
    },
    async scanTicketService(state, data) {
        const res = await http.post('ticket/scan/' + data.id, data)
        if (res.response)
            return res.response.data

        return res.data
    }

}