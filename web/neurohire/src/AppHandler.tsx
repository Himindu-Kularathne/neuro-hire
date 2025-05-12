import React, { useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Error from "./pages/not-found/404";
import Layout from "./layout/Layout";
import { getActiveRoutes, routes } from "./routes";
import Login from "./pages/login/login";
import { useAuth } from "./context/AuthContext";
import { refreshAccessToken } from "./api/auth/login";
import Loader from "./component/LoadingComponent";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <Error />,
    children: getActiveRoutes(routes),
  },
]);

const decodeToken = (token: string) => {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch {
    return null;
  }
};

const AppHandler: React.FC = () => {
  const { isAuthenticated, setIsAuthenticated } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const validateToken = async () => {
      const accessToken = localStorage.getItem("accessToken");
      const refreshToken = localStorage.getItem("refreshToken");
      const currentTime = Math.floor(Date.now() / 1000);

      const accessPayload = accessToken ? decodeToken(accessToken) : null;

      if (accessPayload && accessPayload.exp > currentTime) {
        setIsAuthenticated(true);
      } else if (refreshToken) {
        const refreshPayload = decodeToken(refreshToken);

        if (refreshPayload && refreshPayload.exp > currentTime) {
          try {
            await refreshAccessToken();
            setIsAuthenticated(true);
          } catch (err) {
            console.error("Error refreshing token:", err);
            setIsAuthenticated(false);
          }
        } else {
          localStorage.removeItem("refreshToken");
          setIsAuthenticated(false);
        }

        localStorage.removeItem("accessToken");
      } else {
        setIsAuthenticated(false);
      }

      setLoading(false);
    };

    validateToken();
  }, [setIsAuthenticated]);

  if (loading) return <Loader />;

  return isAuthenticated ? <RouterProvider router={router} /> : <Login />;
};

export default AppHandler;
