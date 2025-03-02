// src/app/customer/movies/page.tsx
'use client';

import ProtectedRoute from '@/components/protected-route';

export default function CustomerMoviesPage() {
  return (
    <ProtectedRoute allowedRoles={['CUSTOMER']}>
      <div>
        <h1>Movies</h1>
        {/* Your page content */}
      </div>
     </ProtectedRoute>
  );
}