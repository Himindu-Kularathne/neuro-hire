// Copyright (c) 2025 Neuro Hire
//
// Licensed under the MIT License.
// See LICENSE file in the project root for full license information.

import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import AppHeader from "./header/Header";

export default function Layout() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AppHeader />
      <Outlet />
    </Suspense>
  );
}
