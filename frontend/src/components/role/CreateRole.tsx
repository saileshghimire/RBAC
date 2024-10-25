

import { useForm } from "@tanstack/react-form";
import type { FieldApi } from '@tanstack/react-form'
import { toast } from "sonner";
import { Toast } from "../../container/Toast";
import { useEffect, useState } from "react";
import { getseeditem } from "../../helper/axios/role";
import { FieldInfo } from "../../helper/validation/FieldInfo"; 



// export const CreateRole = () => {
//     const [initialValue, setInitialValue] = useState<
//         { id: number; name: string }[]
//     >([]);

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const response = await getseeditem();
//                 setInitialValue(response.data);
//             } catch (error) {
//                 toast.error("Please refresh");
//             }
//         };
//         fetchData();
//     }, []);

//     const form = useForm({
//         defaultValues: {
//             role: "",
//             permissions: [],
//         },
//         onSubmit: async ({ value }) => {
//             // console.log({
//             //     role: value.role,
//             //     permissions: value.permissions
//             // });
//             console.log(value);
            
//         },
//     });

//     // Function to handle the selection of permissions
//     const handlePermissionChange = (field: FieldApi<any, any, any, any>, model: string, permission: string) => {
//         const permissionKey = `${permission}_${model}`;
//         const newPermissions = field.state.value.includes(permissionKey)
//             ? field.state.value.filter((perm: any) => perm !== permissionKey)
//             : [...field.state.value, permissionKey];
//         field.setValue(newPermissions);
//     };

//     // Function to handle selecting/deselecting all permissions for a model
//     const toggleAllPermissions = (field: FieldApi<any, any, any, any>, model: string) => {
//         const modelPermissions = [
//             `create_${model}`,
//             `update_${model}`,
//             `read_${model}`,
//             `delete_${model}`,
//         ];

//         const allSelected = modelPermissions.every((perm) =>
//             field.state.value.includes(perm)
//         );

//         const newPermissions = allSelected
//             ? field.state.value.filter((perm: any) => !modelPermissions.includes(perm))
//             : [...field.state.value, ...modelPermissions.filter((perm) => !field.state.value.includes(perm))];

//         field.setValue(newPermissions);
//     };

//     return (
//         <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-200 to-gray-400">
//             <Toast />
//             <form
//                 onSubmit={(e) => {
//                     e.preventDefault();
//                     e.stopPropagation();
//                     form.handleSubmit();
//                 }}
//                 className="bg-white shadow-lg rounded-lg p-8 w-full max-w-xl"
//             >
//                 {/* Title */}
//                 <h1 className="text-2xl font-bold mb-6 text-gray-700 text-center">
//                     Create a New Role
//                 </h1>

//                 {/* Role Input */}
//                 <div className="mb-6">
//                     <form.Field
//                         name="role"
//                         children={(field: FieldApi<any, any, any, any>) => (
//                             <>
//                                 <label
//                                     htmlFor={field.name}
//                                     className="block text-gray-600 font-semibold mb-2"
//                                 >
//                                     Role Name:
//                                 </label>
//                                 <input
//                                     id={field.name}
//                                     name={field.name}
//                                     value={field.state.value}
//                                     onChange={(e) =>
//                                         field.handleChange(e.target.value)
//                                     }
//                                     className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-indigo-200"
//                                     placeholder="Enter Role Name"
//                                 />
//                                 <FieldInfo field={field} />
//                             </>
//                         )}
//                     />
//                 </div>

//                 {/* Permissions for each model */}
//                 <form.Field
//                     name="permissions"
//                     children={(field: FieldApi<any, any, any, any>) => (
//                         <div className="mb-6">
//                             <h2 className="text-lg font-semibold mb-3 text-gray-700">
//                                 Assign Permissions:
//                             </h2>

//                             {initialValue.map((model) => (
//                                 <div
//                                     key={model.id}
//                                     className="p-4 bg-gray-100 rounded-lg mb-4"
//                                 >
//                                     <div className="flex items-center justify-between mb-3">
//                                         <button
//                                             type="button"
//                                             onClick={() =>
//                                                 toggleAllPermissions(
//                                                     field,
//                                                     model.name.toLowerCase()
//                                                 )
//                                             }
//                                             className="text-gray-800 font-bold text-lg"
//                                         >
//                                             {model.name}
//                                         </button>

//                                         {/* Buttons for creating, reading, updating, deleting permissions */}
//                                         <div className="flex space-x-3">
//                                             {["create", "update", "read", "delete"].map(
//                                                 (permission) => (
//                                                     <label
//                                                         key={permission}
//                                                         className="flex items-center space-x-1"
//                                                     >
//                                                         <input
//                                                             type="checkbox"
//                                                             className="form-checkbox text-indigo-500"
//                                                             checked={field.state.value.includes(
//                                                                 `${permission}_${model.name.toLowerCase()}`
//                                                             )}
//                                                             onChange={() =>
//                                                                 handlePermissionChange(
//                                                                     field,
//                                                                     model.name.toLowerCase(),
//                                                                     permission
//                                                                 )
//                                                             }
//                                                         />
//                                                         <span className="capitalize text-gray-600">
//                                                             {permission}
//                                                         </span>
//                                                     </label>
//                                                 )
//                                             )}
//                                         </div>
//                                     </div>
//                                 </div>
//                             ))}
//                         </div>
//                     )}
//                 />

//                 {/* Displaying selected permissions */}
//                 {form.getFieldValue("permissions").length > 0 && (
//                     <div className="mb-6">
//                         <h3 className="text-lg font-semibold mb-3 text-gray-700">
//                             Selected Permissions:
//                         </h3>
//                         <ul className="list-disc ml-5 text-gray-600">
//                             {form.getFieldValue("permissions").map((perm: string) => (
//                                 <li key={perm}>{perm}</li>
//                             ))}
//                         </ul>
//                     </div>
//                 )}

//                 {/* Submit Button */}
//                 <form.Subscribe
//                     children={() => (
//                         <button
//                             type="submit"
//                             className="w-full py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition duration-300"
//                         >
//                             Submit
//                         </button>
//                     )}
//                 />
//             </form>
//         </div>
//     );
// };


export const CreateRole = () => {
    const [initialValue, setInitialValue] = useState<
        { id: number; name: string }[]
    >([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getseeditem();
                setInitialValue(response.data);
            } catch (error) {
                toast.error("Please refresh");
            }
        };
        fetchData();
    }, []);

    const form = useForm({
        defaultValues: {
            role: "",
            permissions: [],
        },
        onSubmit: async ({ value }) => {
            console.log({
                role: value.role,
                permissions: value.permissions
            });
        },
    });

    // Function to handle the selection of permissions
    const handlePermissionChange = (field: FieldApi<any, any, any, any>, model: string, permission: string) => {
        const permissionKey = `${permission}_${model}`;
        const newPermissions = field.state.value.includes(permissionKey)
            ? field.state.value.filter((perm: any) => perm !== permissionKey)
            : [...field.state.value, permissionKey];
        field.setValue(newPermissions);
    };

    // Function to handle selecting/deselecting all permissions for a model
    const toggleAllPermissions = (field: FieldApi<any, any, any, any>, model: string) => {
        const modelPermissions = [
            `create_${model}`,
            `update_${model}`,
            `read_${model}`,
            `delete_${model}`,
        ];

        const allSelected = modelPermissions.every((perm) =>
            field.state.value.includes(perm)
        );

        const newPermissions = allSelected
            ? field.state.value.filter((perm: any) => !modelPermissions.includes(perm))
            : [...field.state.value, ...modelPermissions.filter((perm) => !field.state.value.includes(perm))];

        field.setValue(newPermissions);
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-200 to-gray-400">
            <Toast />
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    form.handleSubmit();
                }}
                className="bg-white shadow-lg rounded-lg p-8 w-full max-w-xl"
            >
                {/* Title */}
                <h1 className="text-2xl font-bold mb-6 text-gray-700 text-center">
                    Create a New Role
                </h1>

                {/* Role Input */}
                <div className="mb-6">
                    <form.Field
                        name="role"
                        children={(field: FieldApi<any, any, any, any>) => (
                            <>
                                <label
                                    htmlFor={field.name}
                                    className="block text-gray-600 font-semibold mb-2"
                                >
                                    Role Name:
                                </label>
                                <input
                                    id={field.name}
                                    name={field.name}
                                    value={field.state.value}
                                    onChange={(e) =>
                                        field.handleChange(e.target.value)
                                    }
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-indigo-200"
                                    placeholder="Enter Role Name"
                                />
                                <FieldInfo field={field} />
                            </>
                        )}
                    />
                </div>

                {/* Permissions for each model */}
                <form.Field
                    name="permissions"
                    children={(field: FieldApi<any, any, any, any>) => (
                        <div className="mb-6">
                            <h2 className="text-lg font-semibold mb-3 text-gray-700">
                                Assign Permissions:
                            </h2>
                            
                            {initialValue.map((model) => (
                                <div
                                    key={model.id}
                                    className="p-4 bg-gray-100 rounded-lg mb-4"
                                >
                                    <div className="flex items-center justify-between mb-3">
                                        <button
                                            type="button"
                                            onClick={() =>
                                                toggleAllPermissions(
                                                    field,
                                                    model.name.toLowerCase()
                                                )
                                            }
                                            className="text-gray-800 font-bold text-lg"
                                        >
                                            {model.name}
                                        </button>

                                        {/* Buttons for creating, reading, updating, deleting permissions */}
                                        <div className="flex space-x-3">
                                            {["create", "update", "read", "delete"].map(
                                                (permission) => (
                                                    <label
                                                        key={permission}
                                                        className="flex items-center space-x-1"
                                                    >
                                                        <input
                                                            type="checkbox"
                                                            className="form-checkbox text-indigo-500"
                                                            checked={field.state.value.includes(
                                                                `${permission}_${model.name.toLowerCase()}`
                                                            )}
                                                            onChange={() =>
                                                                handlePermissionChange(
                                                                    field,
                                                                    model.name.toLowerCase(),
                                                                    permission
                                                                )
                                                            }
                                                        />
                                                        <span className="capitalize text-gray-600">
                                                            {permission}
                                                        </span>
                                                    </label>
                                                )
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                />

                {/* Displaying selected permissions */}
                <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-3 text-gray-700">
                        Selected Permissions:
                    </h3>
                    <ul className="list-disc ml-5 text-gray-600">
                        {form.getFieldValue("permissions").map((perm: any) => (
                            <li key={perm}>{perm}</li>
                        ))}
                    </ul>
                </div>

                {/* Submit Button */}
                <form.Subscribe 
                children={() => (
                    <button
                        type="submit"
                        className="w-full py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition duration-300"
                    >
                        Submit
                    </button>
                )}
                />
            </form>
        </div>
    );
};