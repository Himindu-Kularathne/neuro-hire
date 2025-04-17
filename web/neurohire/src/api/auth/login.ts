import { fetchApi } from "../index";

export async function login(email: string, password: string) {
  if (!email || !password) {
    throw new Error("Email and password are required");
  }

  return fetchApi("http://localhost:3001/api/auth/login", "POST", {
    email,
    password,
  }).then((response) => {
    if (response.accessToken) {
      localStorage.setItem("accessToken", response.accessToken);
      localStorage.setItem("user", JSON.stringify(response.user));
    }
    return response;
  });
}
