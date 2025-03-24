import React from "react";
import {RouteObject,  NonIndexRouteObject} from "react-router-dom";


export const routes: RouteObject[] = [  
    {
        path : '/',
        element : <Login />,
        children : []
    }
];