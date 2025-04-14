"use client";
import { useEffect, useState } from "react";
import { auth } from "../../lib/firebase";
import { signOut, onAuthStateChanged } from "firebase/auth";
import type { User } from "firebase/auth";
import Home from "../components/Home";
import Auth from "./auth/page.jsx"
export default function HomePage() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
  };

  return (
    <div className="bg-black text-white flex flex-col">
      

      {user ? (
        <>
          <Home />
          
        </>
      ) : (
        <>
          <Auth/>
        </>
      )}
    </div>
  );
}
