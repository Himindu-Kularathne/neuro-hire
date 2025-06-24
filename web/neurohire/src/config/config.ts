// Copyright (c) 2025 Neuro Hire
//
// Licensed under the MIT License.
// See LICENSE file in the project root for full license information.

const MainServiceBaseUrl = import.meta.env.VITE_MAIN_SERVICE_BASE_URL;
const AuthServiceBaseUrl = import.meta.env.VITE_AUTH_SERVICE_BASE_URL;

// export const MainServiceBaseUrl = "http://localhost:3005";
// export const AuthServiceBaseUrl = "http://localhost:3001";

export const AppConfig = {
  serviceUrls: {
    invite: MainServiceBaseUrl + "/api" + "/invite",
    job: MainServiceBaseUrl + "/api" + "/job",
    resumes: MainServiceBaseUrl + "/api" + "/resumes",
    profile: MainServiceBaseUrl + "/api" + "/profile",
    auth: AuthServiceBaseUrl + "/api" + "/auth",
  },
};
