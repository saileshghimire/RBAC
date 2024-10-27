import { useEffect, useState } from "react";
import { toast } from "sonner";
import { roleList, deleteRole } from "../../helper/axios/role";
import { useNavigate } from "react-router-dom";
import { Toast } from "../../container/Toast";

const RoleList = () => {
    const [roles, setRoles] = useState<{ id: string; name: string }[]>([]);
    const [showMenu, setShowMenu] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRoles = async () => {
            try {
                const response = await roleList();
                setRoles(response.data);
            } catch (error) {
                toast.error("Failed to fetch roles");
            }
        };
        fetchRoles();
    }, []);

    const handleUpdate = (id:string) => {
        console.log("updatebutton");
        console.log(id);    
        // setShowMenu(null); 
        navigate(`/updaterole/${id}`);
    };

    const handleDelete = async (id: string) => {
        try {
            await deleteRole(id);
            setRoles((prevRoles) => prevRoles.filter((role) => role.id !== id));
            setShowMenu(null); // Close the menu after clicking delete
            toast.success("Role deleted successfully");
        } catch (error) {
            toast.error("Failed to delete role");
        }
    };

    return (
        <div className="container mx-auto px-10 py-12 max-w-6xl min-h-[600px]">
            <Toast />
            <div className="overflow-x-auto">
                <h1 className="text-4xl font-bold mb-8 text-center text-blue-600">Roles</h1>
                <table className="min-w-[600px] bg-white shadow-lg rounded-lg overflow-hidden border">
                    <thead className="bg-blue-200">
                        <tr>
                            <th className="py-4 px-6 text-left font-medium text-gray-700">S.N</th>
                            <th className="py-4 px-6 text-left font-medium text-gray-700">Name</th>
                            <th className="py-4 px-6 text-left font-medium text-gray-700">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {roles.map((role, index) => (
                            <tr key={role.id} className="border-b hover:bg-gray-50">
                                <td className="py-3 px-6">{index + 1}</td>
                                <td className="py-3 px-6">{role.name}</td>
                                <td className="py-3 px-6">
                                    <button
                                        onClick={() => setShowMenu(showMenu === role.id ? null : role.id)}
                                        className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-md shadow-sm hover:bg-blue-700 focus:outline-none"
                                    >
                                        Options
                                    </button>
                                    {showMenu === role.id && (
                                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border z-20">
                                            <div className="flex flex-col p-2 space-y-2">
                                                <button
                                                    onClick={() => handleUpdate(role.id)}
                                                    className="px-4 py-2 bg-green-500 text-white font-medium rounded-md hover:bg-green-600 w-full text-center transition"
                                                >
                                                    Update
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(role.id)}
                                                    className="px-4 py-2 bg-red-500 text-white font-medium rounded-md hover:bg-red-600 w-full text-center transition"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default RoleList;
