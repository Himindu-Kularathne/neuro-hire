import { fetchApi } from "../../index";

export async function getProfile() {
  try {
    const profileData = await fetchApi(
      "http://localhost:3005/api/profile",
      "GET",
    );
    return profileData;
  } catch (error) {
    console.error("Failed to fetch profile data:");
    throw error;
  }
}
