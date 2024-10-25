import axios from "axios"

export const getseeditem = async() =>{
    return await axios.get("http://localhost:3000/api/role/seeditem")
}