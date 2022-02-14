import axios from "axios";
import ApiUrl from "./ApiUrl";

export default {

    getFriends:() => axios.post(ApiUrl()+"friends/friendList"),
    acceptRequest: (id:number)=> axios.post( ApiUrl()+"friends/acceptRequest/"+id),
    sendRequest: (id:number) => axios.post(ApiUrl()+"friends/sendRequest"+id),
    getRequests: () => axios.get(ApiUrl()+"friends/friendRequest"),
    searchFriend: (search) => axios.post(ApiUrl()+"friends/searchFriend",{
        search:search
    }),


}