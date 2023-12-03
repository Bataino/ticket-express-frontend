import http from "./http"

export default {
    async getOrdersService(store, {event_id, page = 1, params}) {
        const paginate = 25
        const res = await http.get(`order/event/${event_id}?page=${page}&paginate=${paginate}`, {
            params
        })
        if (res.data?.success) {
            store.commit("update", ['orders', res.data.data])
        }
        return res.data
    },
    async getOrderSummaryService(store, event_id) {
        const res = await http.get(`order/summary/${event_id}`)
        if (res.data?.success) {
            // store.commit("update", ['orders', res.data.data])
        }
        return res.data
    },

    async getAllOrdersService(store, payload) {
        const page = payload?.page ?? 1
        const paginate = 25
        const res = await http.get(`order?page=${page ?? 1}&paginate=${paginate}`)
        if (res.data?.success) {
            store.commit("update", ['allOrders', res.data.data])
        }
        return res.data
    },

}