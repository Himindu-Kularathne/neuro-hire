
import {lazy} from 'react';

const firstView = lazy(() => import('./first-view'));
const homeView = lazy(() => import('./home-view'));
const jobsView = lazy(() => import('./jobs-view'));


export const View = {
    firstView,
    homeView,
    jobsView
};