"use client";

import { useEffect, useState } from "react";
import { auth, db } from "../../../lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { signOut, onAuthStateChanged } from "firebase/auth";
import {
  Search,
  User,
  Phone,
  BadgeInfo,
  LayoutPanelTop,
  Fingerprint,
  LogOut,
} from "lucide-react";
import Swal from 'sweetalert2'
import { useRouter } from "next/navigation"; 

interface Usuario {
  uid: string;
  nombre: string;
  foto: string;
  categoria: string;
  phone: string;
  side: string;
  email: string;
}

export default function Perfil() {
  const [usuario, setUsuario] = useState<Usuario | null>(null);

  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    const result = await Swal.fire({
      theme: "dark",
      title: "¿Quieres cerrar sesión?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "¡Sí, cerrar sesión!"
    });
  
    if (result.isConfirmed) {
      await signOut(auth);
  
      await Swal.fire({
        theme: "dark",
        title: "¡Cerraste sesión correctamente!",
        text: "¡Vuelve pronto!",
        icon: "success"
      });
      router.push("/");
    }
  };
  

  useEffect(() => {
    setMounted(true);

    const traerUsuario = async () => {
      const user = auth.currentUser;
      if (!user) return;

      const ref = doc(db, "users", user.uid);
      const snap = await getDoc(ref);
      const data = snap.exists() ? snap.data() : {};

      setUsuario({
        uid: user.uid,
        nombre: data.name || user.displayName || "Jugador",
        foto: data.photoURL || "/img/userDefault.png",
        categoria: data.category || "Sin categoría",
        phone: data.phone || "No especificado",
        side: data.side || "No definido",
        email: data.email || user.email || "",
      });
    };

    traerUsuario();
  }, []);

  if (!mounted) return null;

  if (!usuario) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#0f0f0f]">
        <p className="text-white">Cargando perfil...</p>
      </div>
    );
  }

  return (
    <div className="flex max-h-screen items-center justify-center px-4">
      <div className="w-full max-w-sm bg-[#1f2937] rounded-2xl p-5 shadow-lg space-y-4">
        {/* Encabezado con foto y nombre */}
        <div className="flex items-center justify-between text-white">
          <div className="flex items-center space-x-3">
            <img
              src={usuario.foto}
              alt="Foto de perfil"
              className="w-10 h-10 rounded-full object-cover"
            />
            <div className="text-sm">
              <p className="font-semibold">{usuario.nombre}</p>
              <p className="text-gray-400 text-xs">{usuario.email}</p>
            </div>
          </div>
          <button onClick={handleLogout}>
            <LogOut className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* Datos del perfil */}
        <div className="bg-[#111827] rounded-xl p-4 space-y-3 text-white">
          <Item icon={<BadgeInfo className="w-4 h-4 text-blue-400" />} label="Categoría" value={usuario.categoria} />
          <Item icon={<Phone className="w-4 h-4 text-green-400" />} label="Teléfono" value={usuario.phone} />
          <Item icon={<LayoutPanelTop className="w-4 h-4 text-purple-400" />} label="Lado preferido" value={usuario.side} />
          <Item icon={<Fingerprint className="w-4 h-4 text-pink-400" />} label="UID" value={usuario.uid} />
        </div>
        <div className="bg-[#111827] rounded-xl p-4 space-y-3 text-white">
          <Item icon={<BadgeInfo className="w-4 h-4 text-blue-400" />} label="Partidos jugados" value={usuario.categoria} />
          <Item icon={<Phone className="w-4 h-4 text-green-400" />} label="Teléfono" value={usuario.phone} />
          <Item icon={<LayoutPanelTop className="w-4 h-4 text-purple-400" />} label="Lado preferido" value={usuario.side} />
          <Item icon={<Fingerprint className="w-4 h-4 text-pink-400" />} label="UID" value={usuario.uid} />
        </div>
      </div>
    </div>
  );
}

function Item({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center space-x-3">
        {icon}
        <span className="text-sm">{label}</span>
      </div>
      <span className="text-xs text-gray-300">{value}</span>
    </div>
  );
}
