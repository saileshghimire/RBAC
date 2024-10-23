// type username = {
//     username :string
// }

export const usernameValidate = async(value:string) =>{
    if(!value){
        return `Username is required`
    } else if(value.includes(" ")){
        return `Invalid username: No space allowed`
    }

}

export const usernameAsyncValidate = async(value:string) =>{
    await new Promise(resolve => setTimeout(resolve, 500));

    if (value === 'existingUser') {
        return 'This username is already taken';
    }
}