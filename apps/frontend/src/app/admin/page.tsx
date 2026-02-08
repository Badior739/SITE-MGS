'use client';

import { useAdmin } from '@/context/AdminContext';
import AdminPanel from '@/components/admin/AdminPanel';
import AdminLogin from '@/components/admin/AdminLogin';
import { useEffect, useState } from 'react';

export default function AdminPage() {
  const { isAuthenticated } = useAdmin();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">Chargement...</div>;
  }

  return isAuthenticated ? <AdminPanel /> : <AdminLogin />;
}
