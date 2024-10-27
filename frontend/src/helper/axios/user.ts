import axios from "axios";
import { getAuthHeader } from "../../midddleware/auth";

const BASE_URL="http://localhost:3000";

export const login = async(data:any) =>{
    return await axios.post(`${BASE_URL}/api/user/login`,data)
}

export const register = async(data:any)=>{
    console.log(data);
    return await axios.post(`${BASE_URL}/api/user/register`,data);
    
}

export const logout = async()=>{
    return await axios.get(`${BASE_URL}/api/user/logout`,
        {
            headers:getAuthHeader()
        }
    )
}