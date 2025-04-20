import { fetchApi } from "../../index";

export async function getProfile() {
  try {
    const profileData = await fetchApi("http://localhost:3000/api/profile", "GET");
    console.log("Profile data:", profileData);
    return profileData;
  } catch (error) {
    console.error("Failed to fetch profile data:");
    throw error; 
  }
}
