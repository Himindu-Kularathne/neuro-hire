/*
Copyright (c) 2025 Neuro Hire

Licensed under the MIT License.
See LICENSE file in the project root for full license information.
*/

let isRefreshing = false;

export async function fetchApi(
  url: string,
  method = "GET",
  body: any = null,
): Promise<any> {
  const getAccessToken = () => localStorage.getItem("accessToken");
  const getRefreshToken = () => localStorage.getItem("refreshToken");

  const makeRequest = async (token: string | null) => {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };
    if (token) headers["Authorization"] = `Bearer ${token}`;

    const res = await fetch(url, {
      method,
      headers,
      body: body ? JSON.stringify(body) : null,
    });

    const cloned = res.clone();
    let data;
    try {
      data = await cloned.json();
    } catch {}

    if (!res.ok) {
      const message = data?.message || `HTTP error: ${res.status}`;
      const error: any = new Error(message);
      error.status = res.status;
      throw error;
    }

    return data;
  };

  try {
    return await makeRequest(getAccessToken());
  } catch (err: any) {
    if (err.status === 401 && !isRefreshing) {
      isRefreshing = true;
      try {
        const refreshToken = getRefreshToken();
        if (!refreshToken) throw new Error("No refresh token");

        const res = await fetch("/api/auth/refresh", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ refreshToken }),
        });

        if (!res.ok) throw new Error("Refresh token invalid");

        const { accessToken: newToken } = await res.json();
        localStorage.setItem("accessToken", newToken);
        return await makeRequest(newToken);
      } catch (refreshErr) {
        throw refreshErr;
      } finally {
        isRefreshing = false;
      }
    }
    throw err;
  }
}
