
export const getAuthHeader = ()=>{
    const token = localStorage.getItem('token') || "";
    const headers = {
        "Content-Type": "application/json", // Ensures JSON data format
        "Authorization": `${token}`, // Authorization header with token
        "Accept": "application/json" // Specifies JSON as the acceptable response format
    };   
    return headers;
}