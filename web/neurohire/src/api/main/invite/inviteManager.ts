import { fetchApi } from "../../index";

export async function inviteUsers(body: any): Promise<any> {
  if (!body ) {
    throw new Error("Invalid body: Body cannot be null or undefined.");
  }
  try {
    const result = await fetchApi(
      "http://localhost:3005/api/invite",
      "POST",
      body
    );
    return result;
  } catch (error) {
    console.error("Failed to invite users:", error);
    throw error;
  }
}
