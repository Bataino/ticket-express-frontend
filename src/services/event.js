import http from "./http"

export default {
    async getUserEventService(store, data) {
        const res = await http.get('event/user', data)
        if (res.data?.success) {
            store.commit("update", ['events', res.data.data])
        }
        return res.data
    },
    async getDashboardService(store, data) {
        const res = await http.get('dashboard', data)
        if (res.data?.success) {
            // store.commit("update", ['events', res.data.data])
        }
        return res.data
    },
    async createEventService({ commit }, data) {
        const res = await http.post('event', data, {
            headers: {
                "Content-Type": "multipart/formdata"
            }
        })
        if (res.response)
            return res.response.data
        return res.data
    },
    async updateEventService({ commit }, { data, id }) {
        const res = await http.post('event/' + id, data, {
            headers: {
                "Content-Type": "multipart/formdata"
            }
        })
        if (res.response)
            return res.response.data

        commit("update", ["event", res.data.data])
        return res.data
    },
    async deleteEventService({ commit }, id) {
        const res = await http.delete('event/' +id,)
        if (res.response)
            return res.response.data
        return res.data
    },
    async getSingleEventService({ commit }, id) {
        const res = await http.get('event/' + id)
        if (res.response)
            return res.response.data

        commit("update", ["event", res.data.data])
        return res.data
    },

    async deleteImageService(store, { index, id }) {
        const res = await http.delete(`event/${id}/image/${index}`)
        return res.data;
    }
}