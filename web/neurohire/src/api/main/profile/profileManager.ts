import { fetchApi } from "../../index";

export async function getProfile() {
  try {
    const profileData = await fetchApi("http://localhost:3000/api/profile", "GET");
    return profileData;
  } catch (error) {
    console.error("Failed to fetch profile data:", error.message);
    throw error; // rethrow if you want to handle it elsewhere
  }
}
