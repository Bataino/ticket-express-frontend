import http from "./http"

export default {
    async createDiscountService({ commit }, data) {
        const res = await http.post('discount', data)
        if (res.response)
            return res.response
        return res.data
    },
    async updateDiscountService({ commit }, {data, id}) {
        const res = await http.put('discount/'+id, data)
        if (res.response)
            return res.response
        return res.data
    },
    async deleteDiscountService({ commit }, id) {
        const res = await http.delete('discount/'+id)
        if (res.response)
            return res.response
        return res.data
    },
}