// page.jsx
"use client";
import DashboardInner from "./DashboardInner";

import { Suspense } from "react";
 // relative path should match
export default function ClientDashboardPage() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <DashboardInner />
    </Suspense>
  );
}
