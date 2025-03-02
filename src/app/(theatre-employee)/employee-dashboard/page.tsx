// src/app/theatre-employee/employee-dashboard/page.tsx
'use client';

import ProtectedRoute from '@/components/protected-route';

export default function EmployeePage() {
  return (
    <ProtectedRoute allowedRoles={['THEATRE_EMPLOYEE']}>
      <div>
        <h1>Theatre Employee Dashboard</h1>
        {/* Your page content */}
      </div>
     </ProtectedRoute>
  );
}