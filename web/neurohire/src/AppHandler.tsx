import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Error from "./pages/not-found/404";
import Layout from "./layout/Layout";
import { getActiveRoutes, routes } from "./routes";
import Login from "./pages/login/login";
import { useAuth } from "./context/AuthContext";

const AppHandler = () => {
  const { isAuthenticated } = useAuth();

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      errorElement: <Error />,
      children: getActiveRoutes(routes),
    },
  ]);

  return isAuthenticated ? <RouterProvider router={router} /> : <Login />;
};

export default AppHandler;
