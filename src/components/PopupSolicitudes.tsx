"use client";
import { FaUser } from "react-icons/fa";
import Image from "next/image";
import aceptarSolicitud from "../utils/aceptarSolicitud";

export default function PopupSolicitudes({
  partido,
  setPartido,
  cerrar,
  actualizarPartidos,
}: any) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
      <div className="bg-[#1f1f1f] text-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
        <h2 className="text-xl font-semibold mb-4">Solicitudes Pendientes</h2>

        {partido.solicitudesPendientes.map((solicitud: any) => (
          <div key={solicitud.uid} className="flex items-center gap-2 mb-3">
            {solicitud.foto ? (
              <Image src={solicitud.foto} alt={solicitud.nombre} width={30} height={30} className="rounded-full" />
            ) : (
              <FaUser className="text-white" size={30} />
            )}

            <span className="flex-1 text-sm text-gray-300">
              {solicitud.nombre} | {solicitud.categoria} | {solicitud.side}
            </span>

            <button
              onClick={async () => {
                try {
                  await aceptarSolicitud(partido.id, solicitud);
                  const actualizado = {
                    ...partido,
                    solicitudesPendientes: partido.solicitudesPendientes.filter(
                      (s: any) => s.uid !== solicitud.uid
                    ),
                    jugadores: [...partido.jugadores, solicitud],
                  };
                  setPartido(actualizado);
                  actualizarPartidos(actualizado);
                } catch (error: any) {
                  alert("❌ Error: " + error.message);
                }
              }}
              className="px-2 py-1 text-sm bg-green-500 text-white rounded hover:bg-green-600"
            >
              Aceptar
            </button>
          </div>
        ))}

        <button
          onClick={cerrar}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 text-lg"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
