"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../../../lib/firebase"; // Asegurate que el path sea correcto
import { doc, getDoc } from "firebase/firestore";
import { set } from "date-fns";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Usuario logueado
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true); // Para saber si está cargando

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async(usuario) => {
      setUser(usuario || null);
      setLoading(false);

      if (usuario) {
        const userRef = doc(db, "users", usuario.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
            setUserData(userSnap.data());
        }else{
            setUserData(null);
        }
        }else{
            setUserData(null);
        }
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, userData, loading }}>
      {children}
    </AuthContext.Provider>
  );

}
export default function useAuth() {
  return useContext(AuthContext);
}   