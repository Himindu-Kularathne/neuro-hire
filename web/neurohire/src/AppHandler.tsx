import Login from "./pages/login/login";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const AppHandler = () => {

    const router = createBrowserRouter([
        {
            path : '/',
            element : <Login />,
            errorElement : <div>404</div>,
            children : []
        }
    ]);

    return (
        <RouterProvider router={router} />   
    )
}

export default AppHandler;