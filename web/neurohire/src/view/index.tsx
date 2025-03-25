
import {lazy} from 'react';

const firstView = lazy(() => import('./first-view'));
const homeView = lazy(() => import('./home-view'));
const jobsView = lazy(() => import('./jobs-view'));
const addJobView = lazy(() => import('./add-job-view'));


export const View = {
    firstView,
    homeView,
    jobsView,
    addJobView
};