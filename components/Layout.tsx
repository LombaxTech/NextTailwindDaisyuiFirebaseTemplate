import { AuthContext } from "@/context/AuthContext";
import React, { useContext, useEffect } from "react";
import Navbar from "./Navbar";
import { useRouter } from "next/router";

export default function Layout({ children }: { children: any }) {
  const { user, userLoading } = useContext(AuthContext);

  const router = useRouter();

  useEffect(() => {
    if (!userLoading && !user && router.isReady) return;
    
    let { pathname } = router;
    if (pathname !== "/signin" && pathname !== "/signup") {
      router.push("/signin");
    }
  
  }, [user, userLoading, router.isReady, router.pathname]);
  
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-1">{children}</div>
    </div>
  );
}
