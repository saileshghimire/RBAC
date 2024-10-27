import axios from "axios"
import { getAuthHeader } from "../../midddleware/auth"

const BASE_URL="http://localhost:3000"

export const getseeditem = async() =>{
    return await axios.get(`${BASE_URL}/api/role/seeditem`,
        {
            headers:getAuthHeader()
        }
    )
}

export const createRole = async (value:any) =>{
    return await axios.post(`${BASE_URL}/api/role/create`,value,
        {
            headers:getAuthHeader()
        }
    )
}

export const getRolewithId =async(id:string)=>{
  
    return await axios.get(`${BASE_URL}/api/role/${id}`,
        {
            headers:getAuthHeader()
        }
    )
}

export const updateRole = async(roleId:string,value:any) =>{
    console.log(value);
    
    return await axios.put(`${BASE_URL}/api/role//update/${roleId}`,value,{
        headers:getAuthHeader()
    }
);
}


export const roleList = async()=>{
    return await axios.get(`${BASE_URL}/api/role/`,
        {
            headers: getAuthHeader()
        }

    )
}

export const deleteRole = async(id:string)=> {

}