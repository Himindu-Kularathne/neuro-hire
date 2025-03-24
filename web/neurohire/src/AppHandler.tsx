import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Error from "./pages/not-found/404";
import Layout from "./layout/Layout";
import { getActiveRoutes, routes } from "./routes";

const AppHandler = () => {

    const router = createBrowserRouter([
        {
            path : '/',
            element : <Layout />,
            errorElement : <Error />,
            children : getActiveRoutes(routes)
        }
    ]);

    return (
        <RouterProvider router={router} />   
    )
}

export default AppHandler;