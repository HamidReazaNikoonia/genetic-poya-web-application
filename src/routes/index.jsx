// import { createBrowserRouter } from "react-router-dom";
// import { useRoutes } from 'react-router-dom';
// import App from "../App";


// import Auth from "../pages/auth";
// import Dashboard from "../pages/Dashboard";

//   function Users() {
//     return <h2>Users</h2>;
//   }
  
//   function Error() {
//     return <h2>Error</h2>;
//   }
  

// export const router = createBrowserRouter([
//     {
//         path: '/',
//         element: <App />,
//         errorElement: <Error />,
//         children: [
//             {
//                 path: '/auth',
//                 element: <Auth />
//             },
//             {
//                 path: '/dashboard',
//                 element: <Dashboard />,
//                 children: [
//                   {
//                     path: '/dashboard/hamid',
//                     element: <Users />
//                   }
//                 ]
//             },
//             {
//                 path: '/users',
//                 element: <Users />
//             },
//         ]
//     }
// ])


import { useRoutes } from 'react-router-dom';

// import { Landing } from '@/features/misc';
// import { useAuth } from '@/lib/auth';

import { protectedRoutes, publicRoutes } from './protected';
// import { publicRoutes } from './public';

export const AppRoutes = () => {
  const auth = {user: true}

  // const commonRoutes = [{ path: '/', element: <Landing /> }];

  // const routes = auth.user ? protectedRoutes : publicRoutes;

  const element = useRoutes([...protectedRoutes, ...publicRoutes]);

  return <>{element}</>;
};
