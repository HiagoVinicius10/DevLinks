import { createBrowserRouter } from "react-router";

import { Home } from "./pages/home";
import { Login } from "./pages/login";
import { Admin } from "./pages/admin";
import { NetWorks } from "./pages/netWorks";
import { Private } from "./pages/routes/private";
import { Error } from "./pages/error";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home/>
    },
    {
     path: "/login",
     element: <Login/>
    },
    {
        path: "/admin",
        element: <Private> <Admin/> </Private>
    },
    {
        path: '/admin/social',
        element: <Private> <NetWorks/> </Private>
    },
    {
        path: "*",
        element: <Error/>
    }
])

export { router }