"use client";

import { Suspense } from "react";
import DashboardInner from "./DashboardInner";

export default function ClientDashboardPage() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <DashboardInner />
    </Suspense>
  );
}
