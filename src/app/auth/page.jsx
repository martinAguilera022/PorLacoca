"use client";
import { useState, useEffect } from "react";
import { doc, setDoc } from "firebase/firestore";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from "firebase/auth";
import { auth } from "../../../lib/firebase";
import { db } from "../../../lib/firebase";
import LoginForm from "../../components/LoginForm";
import RegisterForm from "../../components/RegisterForm";
import Image from "next/image";
import { useRouter } from "next/navigation"; // si estás en app/

export default function AuthPage() {
  const [user, setUser] = useState(null);
  const [isLogin, setIsLogin] = useState(true);
  const router = useRouter();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const handleLogin = async (email, password) => {
    await signInWithEmailAndPassword(auth, email, password);
    
  };

  const handleRegister = async (name, email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        email: user.email,
        name: name,
      });
      router.push("/settingsData");
    } catch (error) {
      console.error("Error al registrar usuario:", error);
    }
  };


  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
    router.push("/settingsData");
  };

  

  return (
    <div className="bg-black text-white flex flex-col items-center justify-center
    max-h-screen">
      <Image src="/img/logoBlanco.png" alt="PorlaCoca" width={180} height={80} />
      {isLogin ? (
        <LoginForm toggle={() => setIsLogin(false)} handleLogin={handleLogin} handleGoogleLogin={handleGoogleLogin} />
      ) : (
        <RegisterForm toggle={() => setIsLogin(true)} handleRegister={handleRegister} />
      )}
    </div>
  );
}
