"use client";
import Image from "next/image";
import { Calendar, Clock, MapPin, CheckCircle, XCircle } from "lucide-react";
import { FaUser } from "react-icons/fa";
import formatearFechaAmigable from "../utils/formatearFechaAmigable";
import obtenerJugadoresFaltantes from "../utils/obtenerJugadoresFaltantes";
import { formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale";

export default function MiPartidoCard({ partido, onVerSolicitudes }: any) {
  const tiempoDesdePublicacion = (fecha: Date) => {
    if (!fecha) return "";
    return formatDistanceToNow(fecha, { locale: es, addSuffix: true });
  };

  return (
    <div
      key={partido.id}
      className="bg-[#1f1f1f] text-white p-4 rounded-lg shadow-lg flex flex-col gap-2 w-full max-w-lg"
    >
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-2">
          <MapPin size={18} />
          <h2 className="text-lg font-bold">
            {partido.club} | {partido.categoriasPermitidas?.join(", ") || "Todas"}
          </h2>
        </div>

        <span
          className={`text-sm px-2 py-1 rounded ${
            partido.estado === "Abierto"
              ? "bg-green-400 text-black"
              : "bg-red-400 text-black"
          }`}
        >
          {partido.estado}
        </span>
      </div>

      <div className="flex flex-wrap gap-2">
        {partido.jugadores?.map((jugador: any) => (
          <div key={jugador.uid} className="flex border-2 border-gray-600 rounded-full items-center px-2 py-1">
            <Image src={jugador.foto} alt={jugador.nombre} width={30} height={30} className="rounded-full" />
            <span className="ml-2 text-sm text-gray-300">{jugador.nombre}</span>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-3 text-gray-400 text-sm">
        <Calendar size={18} />
        <span>{formatearFechaAmigable(partido.fecha)}</span>
        <Clock size={18} />
        <span>{partido.hora}</span>
      </div>

      <div className="flex items-center gap-2 text-gray-400 text-sm">
        <Image src="/img/ColaPoints.png" alt="CocaPoints" width={30} height={30} className="rounded-full" />
        <span className="flex items-center gap-1">
          PorLaCoca:
          {partido.porLaCoca === "true" ? (
            <CheckCircle size={18} className="text-green-400" />
          ) : (
            <XCircle size={18} className="text-red-400" />
          )}
        </span>
      </div>

      <div className="flex items-center gap-2 text-sm">
        <FaUser className="text-white" />
        <span>{obtenerJugadoresFaltantes(partido.tipo, partido.jugadores)}</span>
      </div>

      {Array.isArray(partido.solicitudesPendientes) && partido.solicitudesPendientes.length > 0 ? (
        <button
          onClick={() => onVerSolicitudes(partido)}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Ver Solicitudes
        </button>
      ) : (
        <p>No hay solicitudes pendientes</p>
      )}

      <p className="text-xs text-gray-500">
        Publicado {tiempoDesdePublicacion(partido.createdAt.toDate())}
      </p>
    </div>
  );
}
