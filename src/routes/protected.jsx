import { Suspense } from "react";
import { Navigate, Outlet } from "react-router-dom";

// import { Spinner } from '@/components/Elements';
// import { MainLayout } from '@/components/Layout';
// import { lazyImport } from '@/utils/lazyImport';

// const { DiscussionsRoutes } = lazyImport(
//   () => import('@/features/discussions'),
//   'DiscussionsRoutes'
// );
// const { Dashboard } = lazyImport(() => import('@/features/misc'), 'Dashboard');
// const { Profile } = lazyImport(() => import('@/features/users'), 'Profile');
// const { Users } = lazyImport(() => import('@/features/users'), 'Users');

import App from "../App";

import Auth from "../pages/auth";
import { DashboardRoutes } from "../pages/Dashboard/routes";

const AppLayout = () => {
  return (
    <>
      <Suspense
        fallback={
          <div className="h-full w-full flex items-center justify-center">
            {/* <Spinner size="xl" /> */}
          </div>
        }
      >
        <App />
      </Suspense>
    </>
  );
};

function Users() {
  return <h2>Users</h2>;
}

function Error() {
  return <h2>Error</h2>;
}

export const protectedRoutes = [
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { path: "/auth", element: <Auth /> },
      { path: "/", element: <Users /> },
      { path: "/profile", element: <Error /> },
      { path: "*", element: <Navigate to="." /> },
    ],
  },
];

export const publicRoutes = [
  { path: "/dashboard/*", element: <AppLayout />,  children: [
    {
        path:"*", element: <DashboardRoutes />
    }
  ]},
];
