// type username = {
//     username :string
// }

export const usernameValidate = ({value}:{value:string}) =>{
    console.log(value);
    if(!value){
        return `Username is required`
    } 
    // else if(value.includes(" ")){
    //     return `Invalid username: No space allowed`
    // }
    // return undefined;

}

export const usernameAsyncValidate = async({value}:{value:string}) =>{
    await new Promise(resolve => setTimeout(resolve, 500));

    if (value === 'existingUser') {
        return 'This username is already taken';
    }
}