"use client";
import Image from "next/image";
import { MapPin, Calendar, Clock, Users, CheckCircle, XCircle } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale";
import { FaUser } from "react-icons/fa";
import formatearFechaAmigable from "../utils/formatearFechaAmigable";
import obtenerJugadoresFaltantes from "../utils/obtenerJugadoresFaltantes";
import { useState } from "react";
import {toast} from "sonner";
import unirseAlPartido from "../utils/unirseAlPartido";
import useAuth from "../app/auth/AuthContext";
import { useEffect } from "react";
const PartidoCard = ({ partido, onVerSolicitudes }) => {
 
  const {user ,userData} = useAuth();
  const [fechaAmigable, setFechaAmigable] = useState("");
 
  const yaPidio = (partido.solicitudesPendientes || []).some(p => p.uid === user.uid);

  const yaEstaEnPartido = partido.jugadores.some((jugador) => jugador.uid === user.uid);
  const puedeJugar = partido.jugadores.length < 4 && userData?.category && partido.categoriasPermitidas.includes(userData.category);

  useEffect(() => {
    setFechaAmigable(formatearFechaAmigable(partido.fecha));
  }, [partido.fecha]);

  const handleUnirse = () => {
    
    if (!user || !userData) {
      toast.error("Debes iniciar sesión para unirte.");
      return;
    }

    unirseAlPartido(partido.id, {
      
      uid: user.uid,
      nombre: userData.name || user.displayName || "Jugador",
      foto: userData.photoURL || "/img/userDefault.png",
      categoria: userData.category || "Sin categoría",
      phone: userData.phone || "No especificado",
      side: userData.side || "No definido",
      email: userData.email || user.email || "",
    });
  };
 
  const tiempo = partido.createdAt?.toDate
    ? formatDistanceToNow(partido.createdAt.toDate(), { addSuffix: true, locale: es })
    : "Desconocido";
  return (
    <div className="bg-[#0f0f0f] text-white p-4 rounded-lg shadow-lg flex flex-col gap-2 w-full max-w-lg">
      {/* Información del partido */}
      <div className="flex justify-between">
      
        <div className="flex items-center gap-2"><MapPin size={18} />
        <h2 className="text-lg font-bold">{partido.club} | {partido.categoriasPermitidas.map(cat => cat).join(", " )}</h2>
         </div>
        
        <span className={`text-sm px-2 py-1 rounded ${partido.estado === "Abierto" ? "bg-green-400" : "bg-red-400"}`}>
          {partido.estado}
        </span>
      </div>
     
      


      {/* Fecha y hora */}
      <div className="flex flex-row items-center gap-2 text-gray-600">
        <Calendar size={18} /> <p className="text-sm text-gray-600">
        {fechaAmigable} |
      </p>
      <Clock size={18} /><p>{partido.hora}</p>
      </div>

      <div className="flex items-center gap-2 text-gray-600">
            <img src="/img/ColaPoints.png" alt="CocaPoints" width={30} height={30} className="rounded-full" />
            <span className="flex gap-2">PorLaCOCA: {partido.porLaCoca ? <CheckCircle size={18} /> : <XCircle size={18} />}</span>
      </div>
    

      <div className="flex items-center gap-2 text-sm">
        <FaUser className="text-white" />
        <span>{obtenerJugadoresFaltantes(partido.tipo)}</span>

      </div>
        <div className="flex items-center flex-wrap gap-2">
            {partido.jugadores.map(jugador => (
            <div key={jugador.uid} className="flex border-2 border-gray-600  rounded-full items-center ">
                <Image src={jugador.foto} alt={jugador.nombre} width={30} height={30} className="rounded-full" />
                <span className="text-gray-600 text-sm px-3 py-1 gap-2">{jugador.nombre} | {jugador.categoria}</span>
            </div>
            ))}
        </div>
      
        <p className="text-sm text-gray-600">Publicado {tiempo}</p>

      {/* Botón de unirse */}
  {!yaEstaEnPartido && puedeJugar && !yaPidio && (
  <button
    onClick={handleUnirse}
    className="bg-white text-black px-4 py-2 rounded-lg hover:bg-yellow-500"
  >
    Unirme al partido
  </button>
)}

{yaPidio && !yaEstaEnPartido && (
  <p className="text-yellow-400 text-sm">Solicitud enviada. Esperando aprobación...</p>
)}

{!puedeJugar && (
  <p className="text-red-400 text-sm">
    Tu categoría no coincide con este partido
  </p>
)}

{yaEstaEnPartido && (
  <p className="text-green-400">¡Ya estás en este partido!</p>
)}
    </div>
  );
};

export default PartidoCard;
