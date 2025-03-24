import { Suspense, useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate, matchRoutes } from "react-router-dom";
import { routes } from "../routes";
import AppHeader from "./header/Header";


export default function Layout () {
   

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <AppHeader />
            <Outlet />
        </Suspense>
    );
}