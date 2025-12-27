"use client";

import { Suspense } from "react";
import AmcRequestInner from "./AmcRequestInner";

export default function AmcRequestPage() {
  return (
    <Suspense fallback={null}>
      <AmcRequestInner />
    </Suspense>
  );
}
