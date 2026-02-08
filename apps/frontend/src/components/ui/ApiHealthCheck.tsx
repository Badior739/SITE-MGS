'use client';

import { useEffect, useState } from 'react';
import { CheckCircle, AlertCircle, Loader } from 'lucide-react';

export function ApiHealthCheck() {
  const [status, setStatus] = useState<'checking' | 'ok' | 'error'>('checking');

  useEffect(() => {
    const checkHealth = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/health`);
        if (response.ok) {
          setStatus('ok');
        } else {
          setStatus('error');
        }
      } catch {
        setStatus('error');
      }
    };

    checkHealth();
    const interval = setInterval(checkHealth, 30000); // Check every 30s
    return () => clearInterval(interval);
  }, []);

  if (status === 'checking') {
    return (
      <div className="flex items-center gap-2 text-gray-500">
        <Loader className="w-4 h-4 animate-spin" />
        <span className="text-sm">API...</span>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="flex items-center gap-2 text-red-500">
        <AlertCircle className="w-4 h-4" />
        <span className="text-sm">API offline</span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 text-green-500">
      <CheckCircle className="w-4 h-4" />
      <span className="text-sm">API ready</span>
    </div>
  );
}
