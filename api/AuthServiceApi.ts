import axios from "axios"
import ApiUrl from "./ApiUrl";

export default {

    register:(body:object)=>axios.post(ApiUrl()+"register",body),
    login:(body:object)=> axios.post(ApiUrl()+"login",body),
    verify:(body:object)=> axios.post(ApiUrl()+"verify",body),
    reverify:(body:object) => axios.post(ApiUrl()+"reverify",body),
    forgetPassword:(body:object) => axios.post(ApiUrl()+"forget-password",body),
    checkToken:(body:object)=>axios.post(ApiUrl()+"check-token",body),
    resetPassword:(body:object)=>axios.post(ApiUrl()+"reset-password",body),
    logOut: ()=> axios.post(ApiUrl()+"logout"),
    getProfile:()=> axios.post(ApiUrl()+"me"),
    refreshToken:()=>axios.post(ApiUrl()+"refresh")

}