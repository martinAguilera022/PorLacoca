import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { db } from "../../lib/firebase";
import Image from "next/image";
import {
  Calendar,
  Clock,
  MapPin,
  CheckCircle,
  XCircle,
} from "lucide-react";
import formatearFechaAmigable from "../utils/formatearFechaAmigable";

const HistorialPartidos = () => {
  const [partidos, setPartidos] = useState([]);

  useEffect(() => {
    const fetchHistorial = async () => {
      const auth = getAuth();
      const user = auth.currentUser;

      if (!user) return;

      const historialRef = collection(db, "users", user.uid, "historialPartidos");

      try {
        const historialSnapshot = await getDocs(historialRef);
        const partidosPromises = historialSnapshot.docs.map(async (docHistorial) => {
          const data = docHistorial.data();
          const partidoRef = doc(db, "partidos", data.partidoId);
          const partidoSnap = await getDoc(partidoRef);
          return partidoSnap.exists()
            ? { id: partidoSnap.id, ...partidoSnap.data(),fechaAceptado: data.fechaAceptado?.toDate() }
            : null;
        });

        const partidosCompletos = (await Promise.all(partidosPromises)).filter(Boolean);
        setPartidos(partidosCompletos);
      } catch (error) {
        console.error("❌ Error al obtener historial de partidos:", error.message);
      }
    };

    fetchHistorial();
  }, []);

  return (
    <div>
      <h2>📜 Historial de Partidos</h2>
      {partidos.length === 0 ? (
        <p>No tenés partidos aún.</p>
      ) : (
        <ul>
          {partidos.map((partido) => (
            <li key={partido.id} className="mb-4 bg-[#1A1A1A] p-4">
              {partido.fechaAceptado && (
                <>
                  <span className="flex items-center gap-3"><MapPin size={18}></MapPin> {partido.club} | {partido.categoriasPermitidas.join(", ")}</span>
                   <div className="flex items-center gap-3 text-gray-400 text-sm">
                                  <Calendar size={18} />
                                  <span>{formatearFechaAmigable(partido.fecha)}</span>
                                  <Clock size={18} />
                                  <span>{partido.hora}</span>
                                </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {partido.jugadores?.map((jugador) => (
                      <div
                        key={`${partido.id}-${jugador.uid}`}
                        className="flex border-2 border-gray-600 rounded-full items-center px-2 py-1"
                      >
                        <Image
                          src={jugador.foto}
                          alt={jugador.nombre}
                          width={30}
                          height={30}
                          className="rounded-full"
                        />
                        <span className="ml-2 text-sm text-gray-300">
                          {jugador.nombre}
                        </span>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
  )}
</div>

  );
};

export default HistorialPartidos;
