import { fetchApi } from "../../index";

export async function getProfile() {
  fetchApi("http://localhost:3000/api/profile", "GET").then((response) => {
    if (response.ok) {
      return response.json();
    }
    return response;
  });
}
