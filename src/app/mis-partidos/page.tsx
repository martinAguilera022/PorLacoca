"use client";

import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { obtenerPartidosDelUsuario, obtenerDetallesPartidos } from "../../utils/obtenerPartidosDelUsuario";
import PartidoCard from "../../components/PartidoCard";
import PopupSolicitudes from "../../components/PopupSolicitudes";
import HistorialPartidos from "../../components/HistorialPartidos";

export default function MisPartidos() {
  const [partidos, setPartidos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [popupPartido, setPopupPartido] = useState<any | null>(null);

  useEffect(() => {
    const cargarPartidos = async () => {
      try {
        const auth = getAuth();
        const user = auth.currentUser;

        if (user) {
          const ids = await obtenerPartidosDelUsuario(user.uid);
          const datos = await obtenerDetallesPartidos(ids);
          setPartidos(datos);
        }
      } catch (error) {
        console.error("Error al cargar partidos:", error);
      } finally {
        setLoading(false);
      }
    };

    cargarPartidos();
  }, []);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#0f0f0f]">
        <p className="text-white">Cargando partidos...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f0f0f] px-4 py-6 text-white">
      <h1>Mi Historial</h1>
      <HistorialPartidos />
      <h1 className="text-2xl font-bold mb-4">Mis Partidos</h1>

      {partidos.length === 0 ? (
        <p className="text-gray-400">No estás anotado en ningún partido aún.</p>
      ) : (
        <div className="space-y-4">
          {partidos.map((partido: any) => (
            <PartidoCard key={partido.id} partido={partido} onVerSolicitudes={setPopupPartido} />
          ))}
        </div>
      )}

      {popupPartido && (
        <PopupSolicitudes
          partido={popupPartido}
          setPartido={setPopupPartido}
          cerrar={() => setPopupPartido(null)}
          actualizarPartidos={(actualizado: any) =>
            setPartidos((prev) =>
              prev.map((p) => (p.id === actualizado.id ? actualizado : p))
            )
          }
        />
      )}
    </div>
  );
}
