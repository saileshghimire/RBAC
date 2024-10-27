

import { useForm } from "@tanstack/react-form";
import { register } from "../helper/axios/user";
import type { FieldApi } from '@tanstack/react-form';
import { usernameValidate } from "../helper/validation/username";
import { passwordValidate } from "../helper/validation/password";
// import { nameValidate } from "../helper/validation/name";
// import { dateValidate } from "../helper/validation/date";
// import { phoneValidate } from "../helper/validation/phonenumber";
import { toast } from "sonner";
import { Toast } from "../container/Toast";
import { useEffect, useState } from "react";
import { FieldInfo } from "../helper/validation/FieldInfo";
import { roleList } from "../helper/axios/role";

export const Register = () => {
    const [roles, setRoles] = useState<{
        id:number, name:string
    }[]>();

    useEffect(()=>{
        const fetchRole = async () =>{
            try {
                const response = await roleList();
                setRoles(response.data);
            } catch (error) {
                toast.error("Failed to fetch roles");
            }
        };
        fetchRole();
    },[])

    const form = useForm({
        defaultValues: {
            username: '',
            password: '',
            firstname: '',
            middlename: '',
            lastname: '',
            address: '',
            phonenumber: '',
            dateofbirth: '',
            roleId: '',
        },
        onSubmit: async ({ value }) => {
            try {
                const response = await register(value);
                toast.success(response.data.message);
            } catch (error: any) {
                toast.error(error.response.data.message);
            }
        }
    });

    return (
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
                        validators={{onChange:usernameValidate}}
                        children={(field:FieldApi<any,any,any,any>)=>{
                            return(
                                <>
                                <label htmlFor={field.name} className="block text-sm font-medium text-gray-700"> Username</label>
                                <input type="text"
                                id={field.name}
                                name={field.name}
                                onBlur={field.handleBlur}
                                onChange={(e)=> field.handleChange(e.target.value)}
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" 
                                />
                                <FieldInfo field={field}/>
                                </>
                            )
                        }}
                        />
                    </div>
                    <div className="mb-6">
                        <form.Field
                        name="password"
                        validators={{onChange:passwordValidate}}
                        children={(field:FieldApi<any,any,any,any>)=>{
                            return(
                                <>
                                <label htmlFor={field.name} className="block text-sm font-medium text-gray-700">Password</label>
                                <input type="text"
                                id={field.name}
                                name={field.name}
                                onBlur={field.handleBlur}
                                onChange={(e)=> field.handleChange(e.target.value)} 
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                />
                                <FieldInfo field={field}/>
                                </>
                            )
                        }}
                        />
                    </div>
                    <div className="mb-6">
                        <form.Field
                        name="firstname"
                        // validators={{onChange:passwordValidate}}
                        children={(field:FieldApi<any,any,any,any>)=>{
                            return(
                                <>
                                <label htmlFor={field.name} className="block text-sm font-medium text-gray-700">FirstName</label>
                                <input type="text"
                                id={field.name}
                                name={field.name}
                                onBlur={field.handleBlur}
                                onChange={(e)=> field.handleChange(e.target.value)} 
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                />
                                <FieldInfo field={field}/>
                                </>
                            )
                        }}
                        />
                    </div>
                    <div className="mb-6">
                        <form.Field
                        name="middlename"
                        validators={{onChange:passwordValidate}}
                        children={(field:FieldApi<any,any,any,any>)=>{
                            return(
                                <>
                                <label htmlFor={field.name} className="block text-sm font-medium text-gray-700">MiddleName</label>
                                <input type="text"
                                id={field.name}
                                name={field.name}
                                onBlur={field.handleBlur}
                                onChange={(e)=> field.handleChange(e.target.value)} 
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                />
                                <FieldInfo field={field}/>
                                </>
                            )
                        }}
                        />
                    </div>
                    <div className="mb-6">
                        <form.Field
                        name="lastname"
                        // validators={{onChange:passwordValidate}}
                        children={(field:FieldApi<any,any,any,any>)=>{
                            return(
                                <>
                                <label htmlFor={field.name} className="block text-sm font-medium text-gray-700">Lastname</label>
                                <input type="text"
                                id={field.name}
                                name={field.name}
                                onBlur={field.handleBlur}
                                onChange={(e)=> field.handleChange(e.target.value)} 
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                />
                                <FieldInfo field={field}/>
                                </>
                            )
                        }}
                        />
                    </div>
                    <div className="mb-6">
                        <form.Field
                        name="address"
                        // validators={{onChange:passwordValidate}}
                        children={(field:FieldApi<any,any,any,any>)=>{
                            return(
                                <>
                                <label htmlFor={field.name} className="block text-sm font-medium text-gray-700">Address</label>
                                <input type="text"
                                id={field.name}
                                name={field.name}
                                onBlur={field.handleBlur}
                                onChange={(e)=> field.handleChange(e.target.value)} 
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                />
                                <FieldInfo field={field}/>
                                </>
                            )
                        }}
                        />
                    </div>
                    <div className="mb-6">
                        <form.Field
                        name="phonenumber"
                        // validators={{onChange:passwordValidate}}
                        children={(field:FieldApi<any,any,any,any>)=>{
                            return(
                                <>
                                <label htmlFor={field.name} className="block text-sm font-medium text-gray-700">Phonenumber</label>
                                <input type="text"
                                id={field.name}
                                name={field.name}
                                onBlur={field.handleBlur}
                                onChange={(e)=> field.handleChange(e.target.value)} 
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                />
                                <FieldInfo field={field}/>
                                </>
                            )
                        }}
                        />
                    </div>
                    <div className="mb-6">
                        <form.Field
                        name="dateofbirth"
                        // validators={{onChange:passwordValidate}}
                        children={(field:FieldApi<any,any,any,any>)=>{
                            return(
                                <>
                                <label htmlFor={field.name} className="block text-sm font-medium text-gray-700">Date of Birth</label>
                                <input type="text"
                                id={field.name}
                                name={field.name}
                                onBlur={field.handleBlur}
                                onChange={(e)=> field.handleChange(e.target.value)} 
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                />
                                <FieldInfo field={field}/>
                                </>
                            )
                        }}
                        />
                    </div>
                    <div className="mb-6">
                        <form.Field
                            name="roleId"
                            children={(field: FieldApi<any, any, any, any>) => {
                                return (
                                    <>
                                        <label htmlFor={field.name} className="block text-sm font-medium text-gray-700">
                                            Role
                                        </label>
                                        <select
                                            id={field.name}
                                            name={field.name}
                                            onBlur={field.handleBlur}
                                            onChange={(e) => field.handleChange(e.target.value)}
                                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                        >
                                            <option value="">Select a Role</option>
                                            {roles && roles.map((role) => (
                                                <option key={role.id} value={role.id}>
                                                    {role.name}
                                                </option>
                                            ))}
                                        </select>
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
                            Register
                        </button>
                    )}
                />
            </form>
        </div>
    );
};
