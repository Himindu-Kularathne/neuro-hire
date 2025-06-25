// Copyright (c) 2025 Neuro Hire
//
// Licensed under the MIT License.
// See LICENSE file in the project root for full license information.

import { AppConfig } from "../../../config/config";
import { fetchApi } from "../../index";

export async function getProfile() {
  try {
    const profileData = await fetchApi(
      `${AppConfig.serviceUrls.profile}`,
      "GET",
    );
    return profileData;
  } catch (error) {
    throw error;
  }
}
