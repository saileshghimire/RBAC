

import { useState, useEffect } from 'react';
import { getLogs } from '../../helper/axios/log';

interface Log {
  level: number;
  time: number;
  pid: number;
  hostname: string;
  methods: string;
  url: string;
  statusCode?: number;
  responseTime?: string;
}

interface ApiResponse {
  data: Log[];
  currentPage: number;
  pageSize: number;
  totalItems: number;
  totalpages: number;
}

export const Log = () => {
  const [logs, setLogs] = useState<ApiResponse | null>(null);
  const [page, setPage] = useState(1);
  const [method, setMethod] = useState<string | null>(null);
  const [date, setDate] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchLogs = async () => {
    setLoading(true);
    setError(null);

    try {
      const params: { page: number; method?: string; date?: string } = { page };
      if (method) params.method = method;
      if (date) params.date = date;
      console.log(params);
      
      const response = await getLogs(params);
      setLogs(response.data);
    } catch (err) {
      setError('Error loading logs.');
    } finally {
      setLoading(false);
    }
  };

  // Fetch logs whenever page, method, or date changes
  useEffect(() => {
    fetchLogs();
  }, [page, method, date]);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <h2 className="text-2xl font-semibold mb-4">Logs</h2>

      {/* Filter Controls */}
      <div className="bg-white shadow rounded-lg p-4 mb-6 flex items-center space-x-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Method</label>
          <select
            className="mt-1 block w-full bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            value={method || ''}
            onChange={(e) => setMethod(e.target.value || null)}
          >
            <option value="">All</option>
            <option value="GET">GET</option>
            <option value="POST">POST</option>
            <option value="POST">PUT</option>
            <option value="POST">PATCH</option>
            <option value="POST">DELETE</option>
            {/* Add other HTTP methods as needed */}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Date</label>
          <input
            type="date"
            className="mt-1 block w-full bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            value={date || ''}
            onChange={(e) => setDate(e.target.value || null)}
          />
        </div>
        <button
          onClick={() => handlePageChange(1)}
          className="mt-6 bg-blue-500 text-white py-2 px-4 rounded-md shadow-sm hover:bg-blue-600 transition"
        >
          Filter
        </button>
      </div>

      {/* Log Data */}
      {loading && <p className="text-center text-gray-600">Loading...</p>}
      {error && <p className="text-center text-red-600">{error}</p>}
      {logs && (
        <div>
          <ul className="space-y-4">
            {logs.data.map((log) => (
              <li key={`${log.pid}-${log.time}`} className="bg-white shadow rounded-lg p-4">
                <p className="text-sm text-gray-600">Method: <span className="font-medium">{log.methods}</span></p>
                <p className="text-sm text-gray-600">Time: <span className="font-medium">{new Date(log.time).toLocaleString()}</span></p>
                <p className="text-sm text-gray-600">URL: <span className="font-medium">{log.url}</span></p>
                {log.statusCode && (
                  <p className="text-sm text-gray-600">Status Code: <span className="font-medium">{log.statusCode}</span></p>
                )}
                {log.responseTime && (
                  <p className="text-sm text-gray-600">Response Time: <span className="font-medium">{log.responseTime}</span></p>
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
              Page {logs.currentPage} of {logs.totalpages}
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


