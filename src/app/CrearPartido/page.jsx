"use client";
import { auth } from "../../../lib/firebase";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../lib/firebase"; // Asegurate que exportás db desde ahí

import CrearPartidoForm from "@/components/CrearPartidoForm";

export default function CrearPartidoPage() {
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) return;
  

    const traerUsuario = async () => {
      const ref = doc(db, "users", user.uid);
      const snap = await getDoc(ref);
  
      const data = snap.exists() ? snap.data() : {};
  
      setUsuario({
        uid: user.uid,
        nombre: data.name || user.displayName || "Jugador",
        foto: user.photoURL ||"/img/userDefault.png",
        categoria: data.category || "Sin categoría" // Podés poner un fallback acá si querés
      });
    };
  
    traerUsuario();
  }, []);
  

  if (!usuario) return <p>Iniciá sesión para continuar</p>;

  return <CrearPartidoForm usuario={usuario} />;
}
