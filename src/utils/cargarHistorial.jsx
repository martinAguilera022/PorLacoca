import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../lib/firebase"; // ajustá ruta según tu proyecto
import { doc, getDoc } from 'firebase/firestore';

const cargarHistorial = async (currentUser) => {
  const partidosRef = collection(db, "partidos");
  const q = query(partidosRef, where("jugadores", "array-contains", currentUser));

  const snapshot = await getDocs(q);
  const partidosEncontrados = snapshot.docs.map(doc => doc.id);

  const usuarioRef = doc(db, "users", currentUser.uid);
  const usuarioSnap = await getDoc(usuarioRef);
  const data = usuarioSnap.data();
  const historialActual = data?.historialPartidos || [];

  // Agregar solo los que falten
  const nuevosPartidos = partidosEncontrados.filter(id => !historialActual.includes(id));

  if (nuevosPartidos.length > 0) {
    await updateDoc(usuarioRef, {
      historialPartidos: arrayUnion(...nuevosPartidos),
    });
  }
};

export default cargarHistorial;
