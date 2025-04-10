"use client";
import { useEffect, useState } from "react";
import { auth } from "../../../lib/firebase";
import { updateProfile } from "firebase/auth";
import { doc, setDoc,getDoc } from "firebase/firestore";
import { db } from "../../../lib/firebase"; // ruta depende de tu estructura
import { useRouter } from "next/navigation"; // si estás en app/
export default function settingsData() {
  const [user, setUser] = useState(null);
  const [phone, setPhone] = useState("");
  const [category, setCategory] = useState("");
  const [side, setSide] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [success, setSuccess] = useState(false);
  const [name, setName] = useState("");
  
  const router = useRouter();
  useEffect(() => {
    const fetchUserData = async () => {
      const currentUser = auth.currentUser;
      if (currentUser) {
        setUser(currentUser);
        const userDoc = await getDoc(doc(db, "users", currentUser.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setName(userData.name || "");
          setPhone(userData.phone || "");
          setCategory(userData.category || "");
          setSide(userData.side || "");
          setPhotoURL(userData.photoURL || "");
        }
      }
    };
  
    fetchUserData();
  }, []);

  const handleSave = async () => {
    try {
      // Actualiza solo la parte del perfil de auth (opcional)
      await updateProfile(auth.currentUser, {
        photoURL: photoURL || null,
        displayName: user.displayName || "Jugador",
      });
  
      // Guarda los datos extra en Firestore
      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        phone,
        category,
        side,
        photoURL:user.photoURL || "/img/userDefault.png",
        name
        
      });
  
      setSuccess(true);
      setTimeout(() => {
        
        router.push("/");
      }, 2000);

    } catch (err) {
      console.error("Error al actualizar perfil:", err);
    }
  };
  

  if (!user) return <p className="text-white text-center mt-10">Cargando...</p>;

  return (
    <div className="bg-black text-white min-h-screen flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold mb-6">Personalizar Perfil</h1>

      <input
        type="text"
        placeholder="Teléfono"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        className="w-full p-3 rounded-xl bg-black border-2 border-white text-white mb-4"
      />

      <input
        type="text"
        placeholder="URL de foto de perfil"
        value={photoURL}
        onChange={(e) => setPhotoURL(e.target.value)}
        className="w-full p-3 rounded-xl bg-black border-2 border-white text-white mb-4"
      />

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="w-full p-3 rounded-xl bg-black border-2 border-white text-white mb-4"
      >
        <option value="">Seleccionar categoría</option>
        <option value="8va">8va</option>
        <option value="7ma">7ma</option>
        <option value="6ta">6ta</option>
        <option value="5ta">5ta</option>
        <option value="4ta">4ta</option>
        <option value="3ra">3ra</option>
        <option value="2da">2da</option>
        <option value="1ra">1ra</option>
      </select>

      <select
        value={side}
        onChange={(e) => setSide(e.target.value)}
        className="w-full p-3 rounded-xl bg-black border-2 border-white text-white mb-4"
      >
        <option value="">Lado de juego</option>
        <option value="Reves">Reves</option>
        <option value="Drive">Drive</option>
        <option value="Ambos">Ambos</option>
      </select>

      <button onClick={handleSave} className="bg-white text-black px-6 py-2 rounded">
        Guardar Perfil
      </button>

      {success && <p className="text-green-400 mt-4">Perfil actualizado correctamente ✅</p>}
    </div>
  );
}
