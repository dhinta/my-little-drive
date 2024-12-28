import { Loader } from '@/common/components';
import { useConvexAuth } from 'convex/react';
import { Navigate, Outlet } from 'react-router';

export function StrictlyPublicLayout() {
  const { isAuthenticated, isLoading } = useConvexAuth();

  console.log('From Public Layout', 'isAuthenticated', isAuthenticated);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="bg-gray-100">
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
}
