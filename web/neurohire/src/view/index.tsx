
import {lazy} from 'react';

const firstView = lazy(() => import('./first-view'));

export const View = {
    firstView,
};