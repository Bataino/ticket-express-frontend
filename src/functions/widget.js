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
        setTimeout(function(){
            load.hide()
        }, 30000)
    }
    static dismiss = () => {
        load.hide()
    }
    static goTo = (link) => {
        setTimeout(function(){
            this.$router.push(link)
        }, 0)
    }
}



