// Copyright (c) 2025 Neuro Hire
//
// Licensed under the MIT License.
// See LICENSE file in the project root for full license information.

import { fetchApi } from "../../index";

export async function processResumes(body: any): Promise<any> {
  if (!body) {
    throw new Error("Invalid body: Body cannot be null or undefined.");
  }
  try {
    const result = await fetchApi(
      "http://localhost:3005/api/resumes/process",
      "POST",
      body,
    );
    return result;
  } catch (error) {
    throw error;
  }
}
