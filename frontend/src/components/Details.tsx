import { useNavigate } from "react-router-dom";

export const Details = () => {
    const navigate = useNavigate();
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
            <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
                <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Navigation</h2>
                <div className="flex flex-col gap-4">
                    <button 
                        onClick={() => navigate('/register')} 
                        className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow hover:bg-blue-600 transition-colors"
                    >
                        Register
                    </button>
                    <button 
                        onClick={() => navigate('/createrole')} 
                        className="w-full py-2 px-4 bg-green-500 text-white font-semibold rounded-lg shadow hover:bg-green-600 transition-colors"
                    >
                        Create Role
                    </button>
                    <button 
                        onClick={() => navigate('/rolelist')} 
                        className="w-full py-2 px-4 bg-purple-500 text-white font-semibold rounded-lg shadow hover:bg-purple-600 transition-colors"
                    >
                        Role List
                    </button>
                    <button 
                        onClick={() => navigate('/logs')} 
                        className="w-full py-2 px-4 bg-indigo-500 text-white font-semibold rounded-lg shadow hover:bg-indigo-600 transition-colors"
                    >
                        Logs
                    </button>
                    <button 
                        onClick={() => navigate('/socketlog')} 
                        className="w-full py-2 px-4 bg-red-500 text-white font-semibold rounded-lg shadow hover:bg-red-600 transition-colors"
                    >
                        Socket Log
                    </button>
                </div>
            </div>
        </div>
    );
};
