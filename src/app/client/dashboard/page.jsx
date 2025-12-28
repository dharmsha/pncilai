"use client";

import { Suspense } from "react";
import DashBoardInner from "./Dashbrd"

export default function ClientDashboardPage() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <DashBoardInner />
    </Suspense>
  );
}
