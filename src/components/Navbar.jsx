"use client";
import { useState, useEffect } from "react";
import { auth } from "../../lib/firebase";
import { signOut, onAuthStateChanged } from "firebase/auth";
import Link from "next/link";
import Image from "next/image";
import { Settings } from "lucide-react";

export default function Navbar() {
  const [user, setUser] = useState(null);

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
    <nav className="bg-black text-white flex justify-between items-center p-4 shadow-lg">
      {/* Logo */}
      <Link href="/">
        <Image src="/img/logoBlanco.png" alt="PorlaCoca" width={120} height={40} className="cursor-pointer" />
      </Link>
<Link href="/CrearPartido">
    Crear Partido
</Link>
<Link href="/CrearPartido">
    Mis partidos
</Link>
      {/* Controles de usuario */}
      <div className="flex items-center gap-4">
        {/* Configuración */}
        <Link href="/settings">
          <Settings className="w-6 h-6 cursor-pointer text-gray-300 hover:text-white" />
        </Link>

        {/* Foto de usuario o login */}
        {user ? (
          <div className="relative group">
            <Image
              src={user.photoURL || "/img/userDefault.png"}
              alt="Usuario"
              width={40}
              height={40}
              className="rounded-full cursor-pointer border-2 border-gray-300 hover:border-white"
            />
            {/* Menú desplegable */}
            <div className="absolute right-0 mt-2 w-40 bg-black text-white rounded-lg shadow-lg hidden group-hover:block">
              <p className="px-4 py-2 text-sm text-gray-400">{user.email}</p>
              <button onClick={handleLogout} className="w-full text-left px-4 py-2 hover:bg-red-600">
                Cerrar sesión
              </button>
            </div>
          </div>
        ) : (
          <Link href="/auth">
            <button className="bg-blue-600 px-4 py-2 rounded-lg">Ingresar</button>
          </Link>
        )}
      </div>
    </nav>
  );
}
