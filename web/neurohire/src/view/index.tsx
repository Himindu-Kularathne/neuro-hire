import { lazy } from "react";

const firstView = lazy(() => import("./first-view"));
const homeView = lazy(() => import("./home-view"));
const jobsView = lazy(() => import("./jobs-view"));
const addJobView = lazy(() => import("./add-job-view"));
const accountView = lazy(() => import("./account-view"));
const gDriveView = lazy(() => import("./gdrive-view"));
const preferencesView = lazy(() => import("./preferences-view"));

export const View = {
  firstView,
  homeView,
  jobsView,
  addJobView,
  gDriveView,
  accountView,
  preferencesView
}
