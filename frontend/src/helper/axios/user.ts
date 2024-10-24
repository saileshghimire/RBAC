import axios from "axios"

export const login = async(data:any) =>{
    return await axios.post("http://localhost:3000/api/user/login",data)
}