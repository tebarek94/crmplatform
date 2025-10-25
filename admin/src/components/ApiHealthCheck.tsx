import { useState, useEffect } from 'react';
import api from '../api/config';

const ApiHealthCheck = () => {
  const [status, setStatus] = useState<'checking' | 'success' | 'error'>('checking');
  const [error, setError] = useState<string>('');
  const [responseTime, setResponseTime] = useState<number>(0);

  useEffect(() => {
    checkApiHealth();
  }, []);

  const checkApiHealth = async () => {
    const startTime = Date.now();
    try {
      await api.get('/health');
      const endTime = Date.now();
      setResponseTime(endTime - startTime);
      setStatus('success');
      setError('');
    } catch (err: any) {
      const endTime = Date.now();
      setResponseTime(endTime - startTime);
      setStatus('error');
      setError(err.message || 'Unknown error');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">API Health Check</h3>
      
      <div className="flex items-center gap-4 mb-4">
        <div className={`w-3 h-3 rounded-full ${
          status === 'checking' ? 'bg-yellow-400 animate-pulse' :
          status === 'success' ? 'bg-green-400' : 'bg-red-400'
        }`}></div>
        
        <span className="text-sm font-medium">
          {status === 'checking' && 'Checking API connection...'}
          {status === 'success' && 'API is responding correctly'}
          {status === 'error' && 'API connection failed'}
        </span>
        
        {responseTime > 0 && (
          <span className="text-xs text-gray-500">
            ({responseTime}ms)
          </span>
        )}
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
          <p className="text-sm text-red-700 font-medium">Error Details:</p>
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      <div className="text-xs text-gray-500">
        <p><strong>API URL:</strong> {import.meta.env.VITE_API_URL || 'https://crmplatform9.onrender.com/api'}</p>
        <p><strong>Endpoint:</strong> /health</p>
      </div>

      <button
        onClick={checkApiHealth}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm"
      >
        Retry Connection
      </button>
    </div>
  );
};

export default ApiHealthCheck;
