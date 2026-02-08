'use client';

import { ApiHealthCheck } from '@/components/ui/ApiHealthCheck';

export default function StatusPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8">Mind Graphix Status</h1>
        
        <div className="space-y-6">
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h2 className="text-xl font-semibold text-white mb-4">Services</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-700 rounded">
                <span className="text-gray-300">Frontend (Next.js)</span>
                <span className="text-green-400">✓ Running</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-700 rounded">
                <span className="text-gray-300">Backend API</span>
                <ApiHealthCheck />
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h2 className="text-xl font-semibold text-white mb-4">Available Routes</h2>
            <div className="space-y-2 text-sm">
              <div className="text-gray-400">
                <span className="text-blue-400">/</span> - Homepage
              </div>
              <div className="text-gray-400">
                <span className="text-blue-400">/blog</span> - Blog
              </div>
              <div className="text-gray-400">
                <span className="text-blue-400">/services</span> - Services
              </div>
              <div className="text-gray-400">
                <span className="text-blue-400">/portfolio</span> - Portfolio
              </div>
              <div className="text-gray-400">
                <span className="text-blue-400">/admin</span> - Admin Panel
              </div>
              <div className="text-gray-400">
                <span className="text-blue-400">/client</span> - Client Dashboard
              </div>
            </div>
          </div>

          <div className="bg-blue-900 bg-opacity-30 rounded-lg p-6 border border-blue-500">
            <h2 className="text-xl font-semibold text-white mb-2">🚀 Phase Progress</h2>
            <div className="text-gray-300 space-y-1">
              <p>✅ Phase 0: Infrastructure & Code Recovery</p>
              <p>✅ Phase 1: Page Routes & Layout</p>
              <p>🔄 Phase 2: API Integration</p>
              <p>⏳ Phase 3: Database & Authentication</p>
              <p>⏳ Phase 4: Testing & Deployment</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
