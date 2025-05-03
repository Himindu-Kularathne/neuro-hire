export async function fetchApi(
  url: string,
  method: string = "GET",
  body: any = null
) {
  const accessToken = localStorage.getItem("accessToken");

  const response = await fetch(url, {
    method: method,
    headers: {
      "Content-Type": "application/json",
      Authorization: accessToken ? `Bearer ${accessToken}` : "",
    },

    body: body ? JSON.stringify(body) : null,
  });

  const responseClone = response.clone();
  let responseData = null;

  try {
    responseData = await responseClone.json();
  } catch (e) {
    console.error("No JSON response body");
  }

  if (!response.ok) {
    const errorMessage =
      responseData?.message || `HTTP error! status: ${response.status}`;
    throw new Error(errorMessage);
  }

  return responseData; // Return parsed response instead of the raw response
}
