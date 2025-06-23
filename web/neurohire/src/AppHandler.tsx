// Copyright (c) 2025 Neuro Hire
//
// Licensed under the MIT License.
// See LICENSE file in the project root for full license information.

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

      // Case 1: Access token is valid
      if (accessPayload && accessPayload.exp > currentTime) {
        setIsAuthenticated(true);
        setLoading(false);
        return;
      }

      // Remove invalid/expired access token
      localStorage.removeItem("accessToken");

      // Case 2: Attempt to refresh if refresh token is valid
      const refreshPayload = refreshToken ? decodeToken(refreshToken) : null;

      if (refreshToken && refreshPayload && refreshPayload.exp > currentTime) {
        try {
          await refreshAccessToken(); // this should store new access token
          setIsAuthenticated(true);
        } catch (err) {
          localStorage.removeItem("refreshToken");
          setIsAuthenticated(false);
        }
      } else {
        // Refresh token is also expired or not present
        localStorage.removeItem("refreshToken");
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
