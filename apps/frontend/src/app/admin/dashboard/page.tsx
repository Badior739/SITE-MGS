'use client';

import { useAdmin } from '@/context/AdminContext';
import AdminPanel from '@/components/admin/AdminPanel';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function DashboardPage() {
  const { isAuthenticated } = useAdmin();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/admin/login');
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) return null;

  return <AdminPanel />;
}
