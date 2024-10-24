
import { useForm } from "@tanstack/react-form";
import { login } from "../helper/axios/user";
import type { FieldApi } from '@tanstack/react-form'
import { usernameValidate } from "../helper/validation/username";
import { passwordValidate } from "../helper/validation/password";



export const Login = ()=> {
    const form = useForm({
        defaultValues:{
            username:'',
            password:''
        },
        onSubmit: async ({value}) =>{
            try {
                console.log(value);
                
                const response = await login(value);
                const token = response.data.token;
                localStorage.setItem('token', token);

            } catch (error) {
                console.log(error);
                
            }
        }
    })
    return(
        <div>
        <form
        onSubmit={(e)=>{
            e.preventDefault()
            e.stopPropagation()
            form.handleSubmit()
        }}
        >
            <div>
            <div>
            <form.Field
            name="username"
            validators={{
                onChange: usernameValidate,
                // onBlurAsync: usernameAsyncValidate
            }}
            children={(field:FieldApi<any, any, any, any>) =>{
                return(
                    <>
                <label htmlFor="{field.name}">Username:</label>
                <input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)} />

                {field.state.meta.errors ? (
                    <em role="alert">{field.state.meta.errors.join(', ')}</em>
                ) : null}
            </>
                )
            }}
            >

            </form.Field>
            </div>
            <div>
        <form.Field
            name="password"
            validators={{
                onChange: passwordValidate
            }}
            children={(field:FieldApi<any, any, any, any>) =>{
                return(
                    <>
                <label htmlFor="{field.name}">Password:</label>
                <input 
                id={field.name}
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e)=> field.handleChange(e.target.value)} />


                {field.state.meta.errors ? (
                <em role="alert">{field.state.meta.errors.join(', ')}</em>
            ) : null}
                </>
                )
            }} 
            >

            </form.Field>
        </div>
            </div>

            <form.Subscribe
            // selector={(state) => [state.canSubmit, state.isSubmitting]}
            children={() => (
              <button type="submit">
                {/* {isSubmitting ? '...' : 'Submit'} */}
                submit
              </button>
            )}
          />
        </form>
        </div>
    )
}
