// src/app/theatre-manager/manager-dashboard/page.tsx
'use client';

import ProtectedRoute from '@/components/protected-route';

export default function ManagerPage() {
  return (
    <ProtectedRoute allowedRoles={['THEATRE_MANAGER']}>
      <div>
        <h1>Theatre Manager Dashboard</h1>
        {/* Your page content */}
      </div>
     </ProtectedRoute>
  );
}