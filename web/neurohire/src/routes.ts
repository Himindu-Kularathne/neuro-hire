import React from "react";
import { RouteObject, NonIndexRouteObject } from "react-router-dom";
import Home from "./pages/home/Home";
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
    text: "Collections",
    icon: undefined,
    element: React.createElement(View.firstView),
    allowRoles: [],
  },
  {
    path: "/home",
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
    path: "/jobs/add",
    text: "Add Job",
    icon: undefined,
    element: React.createElement(View.addJobView),
    allowRoles: [],
  }
];

export const getActiveRoutes = (
  routes: RouteObjectWithRole[]
): NonIndexRouteObject[] => {
  return routes.map((route) => {
    return {
      path: route.path,
      element: route.element,
      children: getActiveRoutes(route.children ? route.children : []),
    };
  });
};
