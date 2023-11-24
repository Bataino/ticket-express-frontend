import axios from "axios"
import Widget from "@/functions/widget"
import { createToaster } from "@meforma/vue-toaster";
import store from "../store";

// import { useToast } from 'primevue/usetoast';

let toast
toast = createToaster({
    position:'top-right',
    duration:3000
});
const url = import.meta.env.VUE_APP_API_URL || "http://127.0.0.1:8000/api/"

const http = axios.create({
    baseURL: url,
    headers: {
        "Authorization": "Bearer " + localStorage.getItem('token'),
        accept: 'application/json',
        'Content-Type': 'application/json',
    },
})

http.interceptors.request.use((request) => {
    return request
    }, 
    (error) => {
        console.error("Request Unuccessfull", error);
        return error
    }
);

http.interceptors.response.use((response) => {
    // console.log("Response recieved", response);
    return response;
},
    (error => {
        try{ 
            Widget.dismiss()
        }
        catch(e){
            e.message
        }
        
        if (error.response) {
        }
        else if (error.request) {
            toast.show("No response recieved");
        }
        else {
        }
        return error;
    })

)

export default http;
