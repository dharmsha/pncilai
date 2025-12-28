"use client";

import { Suspense } from "react";
import DashBoardInner from "./DashboardInner"

export default function ClientDashboardPage() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <DashBoardInner />
    </Suspense>
  );
}
