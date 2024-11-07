import axios from "axios"
import { getAuthHeader } from "../../midddleware/auth"

const BASE_URL="http://localhost:3000"

export const getLogs = async(params:Object) =>{
    return await axios.get(`${BASE_URL}/api/logs`,{
        params,
        headers: getAuthHeader()
    }
    )
}