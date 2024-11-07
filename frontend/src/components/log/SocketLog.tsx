import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

const socket = io("http://localhost:3000");

interface Log {
  level?: number;
  time?: number;
  pid?: number;
  hostname?: string;
  methods: string;
  url: string;
  statusCode?: number;
  responseTime?: string;
  username?:string
}

interface ApiResponse {
  data: Log[];
  currentPage: number;
  pageSize: number;
  totalItems: number;
  totalpages: number;
}

export const SocketLog = () => {
  const [logs, setLogs] = useState<ApiResponse>({
    data: [],
    currentPage: 1,
    pageSize: 10,
    totalItems: 0,
    totalpages: 1,
  });
  const [page, setPage] = useState(1);

  useEffect(() => {
    socket.on("new_log", (data: Log) => {
      setLogs((prevLogs) => {
        const updatedData = [data, ...prevLogs.data]; // Add new log to the beginning of the list
        const totalItems = updatedData.length;
        const pageSize = prevLogs.pageSize;
        const totalpages = Math.ceil(totalItems / pageSize);

        return {
          ...prevLogs,
          data: updatedData,
          totalItems,
          totalpages,
        };
      });
    });

    return () => {
      socket.off("new_log");
    };
  }, []);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const paginatedData = logs.data.slice(
    (page - 1) * logs.pageSize,
    page * logs.pageSize
  );

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <h2 className="text-2xl font-semibold mb-4">Logs</h2>

      {logs.data.length === 0 && <p className="text-center text-gray-600">No logs available.</p>}
      {logs.data.length > 0 && (
        <div>
          <ul className="space-y-4">
            {paginatedData.map((log, index) => (
              <li key={index} className="bg-white shadow rounded-lg p-4">
                <p className="text-sm text-gray-600">
                  Method: <span className="font-medium">{log.methods}</span>
                </p>
                <p className="text-sm text-gray-600">
                  URL: <span className="font-medium">{log.url}</span>
                </p>
                {log.time && (
                  <p className="text-sm text-gray-600">
                    Time: <span className="font-medium">{new Date(log.time).toLocaleString()}</span>
                  </p>
                )}
                {log.statusCode && (
                  <p className="text-sm text-gray-600">
                    Status Code: <span className="font-medium">{log.statusCode}</span>
                  </p>
                )}
                {log.responseTime && (
                  <p className="text-sm text-gray-600">
                    Response Time: <span className="font-medium">{log.responseTime}</span>
                  </p>
                )}
                {log.username && (
                  <p className="text-sm text-gray-600">
                    Username: <span className="font-medium">{log.username}</span>
                  </p>
                )}
              </li>
            ))}
          </ul>

          {/* Pagination */}
          <div className="flex items-center justify-between mt-6">
            <button
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 1}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md disabled:bg-gray-200 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <span className="text-sm text-gray-600">
              Page {page} of {logs.totalpages}
            </span>
            <button
              onClick={() => handlePageChange(page + 1)}
              disabled={page === logs.totalpages}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md disabled:bg-gray-200 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
