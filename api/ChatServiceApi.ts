import axios from "axios";
import ApiUrl from "./ApiUrl";

export default{

    getMessages:(id:number)=> axios.get(ApiUrl()+"chats/"+id),

    sendMessage: (id:number,body:any)=>{
     return axios.post(ApiUrl()+"chats/"+id,body)

    },
    

}