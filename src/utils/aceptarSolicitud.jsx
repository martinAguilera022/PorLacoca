import { doc, updateDoc, arrayRemove, arrayUnion, getDoc, setDoc, collection, addDoc } from "firebase/firestore";
import { db } from "../../lib/firebase";
const aceptarSolicitud = async (partidoId, jugador) => {
  const partidoRef = doc(db, "partidos", partidoId);
  const historialRef = collection(db, "users", jugador.uid, "historialPartidos");

  try {
    console.log("Paso 1: actualizando partido...");
    await updateDoc(partidoRef, {
      solicitudesPendientes: arrayRemove(jugador.uid),
      jugadores: arrayUnion(jugador),
    });
    console.log("✅ Partido actualizado");

    console.log("Paso 2: agregando historial...");
    await addDoc(historialRef, {
      partidoId: partidoId,
      fechaAceptado: new Date(),
      
    });
    console.log("✅ Historial agregado");
  } catch (error) {
    console.error("❌ Error en aceptarSolicitud:", error.message);
  }
};
export default aceptarSolicitud;