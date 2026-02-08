'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAdmin } from '@/context/AdminContext';
import AdminPanel from './AdminPanel';
import AdminLogin from './AdminLogin';

export default function AdminLayout() {
  const { isAuthenticated, adminUser } = useAdmin();
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="min-h-screen flex items-center justify-center">Chargement...</div>;
  }

  if (!isAuthenticated) {
    return <AdminLogin />;
  }

  return <AdminPanel />;
}
