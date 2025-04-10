"use client";
import { useEffect, useState } from "react";
import { onAuthStateChanged, type User } from "firebase/auth";
import { auth } from "../../lib/firebase";
import BottomNavBar from "../components/BottomNavBar";
import Navbar from "../components/Navbar";
import { usePathname } from "next/navigation";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const pathname = usePathname();

  const hideNavPaths = ["/settingsData", "/login"];
  const shouldShowNav = !hideNavPaths.includes(pathname);

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Código que depende del navegador
    }
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="bg-black text-white flex flex-col">
      {user && shouldShowNav && (
        <>
          <div className="hidden md:flex">
            <Navbar />
          </div>
          <div className="fixed bottom-0 left-0 md:hidden z-50">
            <BottomNavBar />
          </div>
        </>
      )}
      <main className="flex-grow pt-4 pb-16 md:pb-0 min-h-screen">{children}</main>
    </div>
  );
}
