import { useLoading } from 'vue-loading-overlay';
let load
let container = document.getElementById("#app")

export default class Widget {
    static openLoading = () => {
        load = useLoading().show({
            loader: "dots",
            color: "#800080",
            container: null,
            zIndex: 9999,
        })
        setTimeout(function () {
            load.hide()
        }, 30000)
    }
    static dismiss = () => {
        load.hide()
    }
    static goTo = (link) => {
        setTimeout(function () {
            this.$router.push(link)
        }, 0)
    }
    static getTotalOrders(orders) {
        if (orders?.[0]) {
            let total = orders.reduce((acc, e) => {
                // console.log(acc, e)
                return acc + e.price
            }, 0)
            return total
        }
        return 0
    }
    static getTicketNumber(orders) {
        if (orders?.[0]) {
            let total = orders.reduce((acc, e) => {
                const tickets =  Object.values(e.items).reduce((a, b) => a + b)
                return acc + tickets
            }, 0)
            return total
        }
        return 0
    }
    static getValidationError(messages, alt){
        let errors = Object.values(messages)
        return errors?.[0]?.[0] ?? alt
    }
    static  scrollTop(){
        document.documentElement.scrollTop = 0
    }
    static scrollTo(elementId){
        const element = document.getElementById(elementId);
        element.scrollIntoView(true);
    }
}



