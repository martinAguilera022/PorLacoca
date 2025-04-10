"use client";

import { useState } from "react";
import { crearPartido } from "./CrearPartido";
import { useRouter } from "next/navigation";
import { set } from "date-fns";

export default function CrearPartidoForm({ usuario }) {
  const [formData, setFormData] = useState({
    fecha: "",
    hora: "",
    club: "",
    categoriasPermitidas: [], // Ahora es un array para múltiples categorías
    tipo: 1,
    porLaCoca: true,
  });

  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("8va");

  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "tipo" ? parseInt(value) : value,
    });
  };
  

  // Función para agregar una categoría
  const agregarCategoria = () => {
    if (!formData.categoriasPermitidas.includes(categoriaSeleccionada)) {
      setFormData({
        ...formData,
        categoriasPermitidas: [...formData.categoriasPermitidas, categoriaSeleccionada],
      });
    }
  };

  // Función para eliminar una categoría
  const eliminarCategoria = (cat) => {
    setFormData({
      ...formData,
      categoriasPermitidas: formData.categoriasPermitidas.filter(c => c !== cat),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const [hour, minute] = formData.hora.split(":").map(Number);
    const [year, month, day] = formData.fecha.split("-").map(Number);
    const fechaIngresada = new Date(year, month - 1, day, hour, minute);
    
    const ahora = new Date();
  
    if (fechaIngresada < ahora) {
      alert("No podés crear partidos en fechas o horas pasadas.");
      return;
    }
  
    const partido = {
      ...formData,
      creador: {
        uid: usuario.uid,
        nombre: usuario.nombre,
        foto: usuario.foto,
        categoria: usuario.categoria
      },
      jugadores: [
        { uid: usuario.uid, nombre: usuario.nombre, foto: usuario.foto , categoria: usuario.categoria },
      ],
    };
  
    await crearPartido(partido, usuario.uid);
    router.push("/");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-black  min-h-screen min-w-screen p-6 gap-8 space-y-4 shadow-xl   text-white"
    >
      <h2 className="text-2xl font-bold text-center">Crear Partido</h2>
      <p>Creado por: {usuario.nombre}</p>

      <label>
        Fecha:
        <input
          type="date"
          name="fecha"
          value={formData.fecha}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          min={new Date().toISOString().split("T")[0]}
          required
        />
      </label>

      <label>
        Hora:
        <input
          type="time"
          name="hora"
          value={formData.hora}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
      </label>

      <label>
        <div className="flex items-center gap-1">
          <img src="/img/ColaPoints.png" alt="" width={20} height={20} className="rounded-full" />
          PorLaCoca:
        </div>
        <select
          name="porLaCoca"
          value={formData.porLaCoca}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        >
          <option value="true">Sí</option>
          <option value="false">No</option>
        </select>
      </label>

      <label>
        Club:
        <input
          type="text"
          name="club"
          value={formData.club}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          placeholder="Nombre del club"
          required
        />
      </label>

      {/* 🔹 Categorías permitidas */}
      <label>
        Categorías permitidas:
        <div className="flex gap-2">
          <select
            value={categoriaSeleccionada}
            onChange={(e) => setCategoriaSeleccionada(e.target.value)}
            className="p-2 border border-white bg-black rounded"
          >
            {["8va", "7ma", "6ta", "5ta", "4ta", "3ra", "2da", "1ra"].map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          <button
            type="button"
            onClick={agregarCategoria}
            className="bg-green-500 text-white px-3 py-1 rounded"
          >
            +
          </button>
        </div>
      </label>

      {/* 🔹 Mostrar categorías agregadas como píldoras */}
      <div className="flex flex-wrap gap-2 mt-2">
        {formData.categoriasPermitidas.map((cat) => (
          <span key={cat} className="bg-black-500 border-white border-2 px-3 py-1 rounded-full flex items-center gap-2">
            {cat}
            <button type="button" onClick={() => eliminarCategoria(cat)} className="text-white font-bold">X</button>
          </span>
        ))}
      </div>

      <label>
        Tipo de búsqueda:
        <select
          name="tipo"
          
          value={formData.tipo}
          onChange={handleChange}
          className="w-full p-2 bg-black  border rounded"
        >
          <option value={2}>Falta una pareja</option>
          <option value={1}>Falta un jugador</option>
          <option value={3}>Busco un partido</option>
        </select>
      </label>

      <button
        type="submit"
        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
      >
        Publicar Partido
      </button>
    </form>
  );
}
