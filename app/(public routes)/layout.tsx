"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Props {
  children: React.ReactNode;
}

const AuthLayout = ({ children }: Props) => {
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    router.refresh();
    setLoading(false);
  }, [router]);

  return <>{loading ? <div>Loading...</div> : children}</>;
};

export default AuthLayout;
