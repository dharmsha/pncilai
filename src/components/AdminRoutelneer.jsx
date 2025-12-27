"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { ADMIN_MOBILE } from "@/config/admin";
import { useEffect, useState } from "react";

export default function AdminRouteInner({ children }) {
  const params = useSearchParams();
  const router = useRouter();

  const phone = params.get("phone");
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    if (!phone) {
      router.push("/login");
      return;
    }

    if (phone === ADMIN_MOBILE) {
      setAllowed(true);
    } else {
      router.push("/unauthorized");
    }
  }, [phone]);

  if (!allowed) return null;

  return <>{children}</>;
}
