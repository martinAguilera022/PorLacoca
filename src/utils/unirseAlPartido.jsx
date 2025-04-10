import { doc, updateDoc, getDoc, arrayUnion } from "firebase/firestore";
import { db } from "../../lib/firebase";

const unirseAlPartido = async (partidoId, jugador) => {
  const ref = doc(db, "partidos", partidoId);

  const snap = await getDoc(ref);
  if (!snap.exists()) {
    console.error("El partido no existe");
    return;
  }

  const partido = snap.data();
  const jugadores = partido.jugadores || [];
  const pendientes = partido.solicitudesPendientes || [];

  // Ya está anotado
  const yaEsta = jugadores.some(j => j.uid === jugador.uid);
  if (yaEsta) {
    console.warn("Ya estás en el partido.");
    return;
  }

  // Ya pidió unirse
  const yaPidio = pendientes.some(p => p.uid === jugador.uid);
  if (yaPidio) {
    console.warn("Ya enviaste una solicitud.");
    return;
  }

  // Enviar solicitud (agregar a solicitudesPendientes)
  await updateDoc(ref, {
    solicitudesPendientes: arrayUnion(jugador),
  });

  console.log("Solicitud enviada. Esperá la aprobación del creador.");
};

export default unirseAlPartido;