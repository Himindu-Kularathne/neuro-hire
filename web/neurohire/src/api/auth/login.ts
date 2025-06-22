/*
Copyright (c) 2025 Neuro Hire

Licensed under the MIT License.
See LICENSE file in the project root for full license information.
*/


import { fetchApi } from "../index";

export async function login(email: string, password: string) {
  if (!email || !password) {
    throw new Error("Email and password are required");
  }

  try {
    const responseData = await fetchApi(
      "http://localhost:3001/api/auth/login",
      "POST",
      {
        email,
        password,
      },
    );
    if (responseData?.accessToken) {
      localStorage.setItem("accessToken", responseData.accessToken);
      // localStorage.setItem("user", JSON.stringify(responseData.user));
    } else {
      console.warn("Login response missing accessToken or user");
    }
    return responseData;
  } catch (error: any) {
    console.error("Login failed:", error.message);
    throw error;
  }
}

// get new access token using refresh token
export async function refreshAccessToken() {
  const refreshToken = localStorage.getItem("refreshToken");
  if (!refreshToken) {
    throw new Error("Refresh token is required");
  }
  try {
    const responseData = await fetchApi(
      "http://localhost:3001/api/auth/refresh",
      "POST",
      {
        refreshToken,
      },
    );
    if (responseData?.accessToken) {
      localStorage.setItem("accessToken", responseData.accessToken);
    } else {
      console.warn("Refresh token response missing accessToken");
    }
    return responseData;
  } catch (error: any) {
    console.error("Failed to refresh access token:", error.message);
    throw error;
  }
}
