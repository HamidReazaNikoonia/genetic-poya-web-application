import { createBrowserRouter } from "react-router-dom";
import App from "../App";


import Auth from "../pages/auth";

function Home() {
    return <h2>Home</h2>;
  }
  
  function About() {
    return <h2>About</h2>;
  }
  
  function Users() {
    return <h2>Users</h2>;
  }
  
  function Error() {
    return <h2>Error</h2>;
  }
  

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        errorElement: <Error />,
        children: [
            {
                path: '/home',
                element: <Auth />
            },
            {
                path: '/about',
                element: <About />,
            },
            {
                path: '/users',
                element: <Users />
            },
        ]
    }
])