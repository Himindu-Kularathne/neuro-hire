// Copyright (c) 2025 Neuro Hire
//
// Licensed under the MIT License.
// See LICENSE file in the project root for full license information.

import React from "react";
import { NonIndexRouteObject } from "react-router-dom";
import { View } from "./view";

export interface RouteObjectWithRole extends NonIndexRouteObject {
  allowRoles: string[];
  text: string;
  icon:
    | React.ReactElement<any, string | React.JSXElementConstructor<any>>
    | undefined;
  children?: RouteObjectWithRole[];
}

export const routes: RouteObjectWithRole[] = [
  {
    path: "/",
    text: "Home",
    icon: undefined,
    element: React.createElement(View.homeView),
    allowRoles: [],
  },
  {
    path: "/jobs/owned",
    text: "Jobs",
    icon: undefined,
    element: React.createElement(View.jobsView),
    allowRoles: [],
  },
  {
    path: "/my-account",
    text: "Account",
    icon: undefined,
    element: React.createElement(View.accountView),
    allowRoles: [],
  },
  {
    path: "preferences",
    text: "Preferences",
    icon: undefined,
    element: React.createElement(View.preferencesView),
    allowRoles: [],
  },
  {
    path: "/jobs/add",
    text: "Add Job",
    icon: undefined,
    element: React.createElement(View.addJobView),
    allowRoles: [],
  },
];

export const getActiveRoutes = (
  routes: RouteObjectWithRole[],
): NonIndexRouteObject[] => {
  return routes.map((route) => {
    return {
      path: route.path,
      element: route.element,
      children: getActiveRoutes(route.children ? route.children : []),
    };
  });
};
