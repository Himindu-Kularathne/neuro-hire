// Copyright (c) 2025 Neuro Hire
//
// Licensed under the MIT License.
// See LICENSE file in the project root for full license information.

import { AppConfig } from "../../../config/config";
import { fetchApi } from "../../index";

export async function inviteUsers(body: any): Promise<any> {
  if (!body) {
    throw new Error("Invalid body: Body cannot be null or undefined.");
  }
  try {
    const result = await fetchApi(
      `${AppConfig.serviceUrls.invite}`,
      "POST",
      body,
    );
    return result;
  } catch (error) {
    throw error;
  }
}
