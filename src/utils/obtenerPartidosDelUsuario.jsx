import { doc, getDoc } from "firebase/firestore";
import { db } from "../../lib/firebase";

export const obtenerPartidosDelUsuario = async (uid) => {
  const userRef = doc(db, "users", uid);
  const userSnap = await getDoc(userRef);

  if (userSnap.exists()) {
    const datosUsuario = userSnap.data();
    return datosUsuario.partidosCreados || [];
  } else {
    console.error("Usuario no encontrado");
    return [];
  }
};

export const obtenerDetallesPartidos = async (ids) => {
  const partidos = [];

  for (let id of ids) {
    const partidoRef = doc(db, "partidos", id);
    const partidoSnap = await getDoc(partidoRef);

    if (partidoSnap.exists()) {
      partidos.push({ id, ...partidoSnap.data() });
    }
  }

  return partidos;
};
