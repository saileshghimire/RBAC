
import { useForm } from "@tanstack/react-form";
import { login } from "../helper/axios/user";
import type { FieldApi } from '@tanstack/react-form'
import { usernameValidate } from "../helper/validation/username";
import { passwordValidate } from "../helper/validation/password";
import { FieldInfo } from "../helper/validation/FieldInfo";
import { toast } from "sonner";
import { Toast } from "../container/Toast";




export const Login = ()=> {
    const form = useForm({
        defaultValues:{
            username: '',
            password: ''
        },
        onSubmit: async ({ value }) =>{
            try {
                const response = await login(value);
                const token = response.data.token;
                
                localStorage.setItem('token', token);
                const message = response.data.message;
                toast.success(message);

            } catch (error:any) {
                toast.error(error.response.data.message);       
             
            }
        }
    });

    return(
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <Toast />
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    form.handleSubmit();
                }}
                className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md"
            >
                <div className="mb-6">
                    <form.Field
                        name="username"
                        validators={{ onChange: usernameValidate }}
                        children={(field: FieldApi<any, any, any, any>) => {
                            return (
                                <>
                                    <label htmlFor={field.name} className="block text-sm font-medium text-gray-700">
                                        Username:
                                    </label>
                                    <input
                                        id={field.name}
                                        name={field.name}
                                        value={field.state.value}
                                        onBlur={field.handleBlur}
                                        onChange={(e) => field.handleChange(e.target.value)}
                                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                    />
                                    {/* Show validation error */}
                                    <FieldInfo field={field} />
                                </>
                            );
                        }}
                    />
                </div>

                <div className="mb-6">
                    <form.Field
                        name="password"
                        validators={{ onChange: passwordValidate }}
                        children={(field: FieldApi<any, any, any, any>) => {
                            return (
                                <>
                                    <label htmlFor={field.name} className="block text-sm font-medium text-gray-700">
                                        Password:
                                    </label>
                                    <input
                                        id={field.name}
                                        name={field.name}
                                        value={field.state.value}
                                        onBlur={field.handleBlur}
                                        onChange={(e) => field.handleChange(e.target.value)}
                                        type="password"
                                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                    />
                                    {/* Show validation error */}
                                    <FieldInfo field={field} />
                                </>
                            );
                        }}
                    />
                </div>

                <form.Subscribe
                    children={() => (
                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            Submit
                        </button>
                    )}
                />
            </form>
        </div>
    );
};
