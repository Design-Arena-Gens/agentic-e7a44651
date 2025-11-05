"use client";

import { useEffect, useState } from "react";
import { SplashScreen } from "./splash-screen";
import { BottomNav } from "../navigation/bottom-nav";

export function RootClient({ children }: { children: React.ReactNode }) {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => setShowSplash(false), 2000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="relative min-h-dvh bg-white">
      {showSplash ? (
        <SplashScreen />
      ) : (
        <div className="pb-28">{children}</div>
      )}
      {!showSplash && <BottomNav />}
    </div>
  );
}
