"use client";

import { Suspense } from "react";
import AdminRouteInner from "./AdminRouteInner";

export default function AdminRoute({ children }) {
  return (
    <Suspense fallback={null}>
      <AdminRouteInner>{children}</AdminRouteInner>
    </Suspense>
  );
}
