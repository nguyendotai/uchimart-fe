"use client";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import PageLoader from "./PageLoader";

export default function GlobalRouteLoader() {
  const pathname = usePathname();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    const timeout = setTimeout(() => {
      setLoading(false);
    }, 2000); // thời gian giả lập loading khi route thay đổi

    return () => clearTimeout(timeout);
  }, [pathname]); // Mỗi khi pathname thay đổi → loading

  if (!loading) return null;
  return <PageLoader />;
}
