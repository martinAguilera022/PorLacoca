"use client";
import { useEffect, useState } from "react";

const mockRanking = [
  { nombre: "Juani", cocas: 22 },
  { nombre: "Lu", cocas: 18 },
  { nombre: "Mati", cocas: 15 },
  { nombre: "Fran", cocas: 13 },
  { nombre: "Sofi", cocas: 11 },
  { nombre: "Cami", cocas: 8 },
  { nombre: "Leo", cocas: 5 },
];

export default function RankingPage() {
  const [ranking, setRanking] = useState([]);

  useEffect(() => {
    // Simulamos fetch de ranking
    setRanking(mockRanking.sort((a, b) => b.cocas - a.cocas));
  }, []);

  return (
    <div className="min-h-screen px-4 py-8 bg-black text-white">
      <h1 className="text-3xl font-bold text-center mb-6">Ranking de Cocas 🍻</h1>
      <p className="text-center text-gray-400 mb-4">¿Quién se toma todas las cocas?</p>

      <div className="max-w-md mx-auto space-y-3">
        {ranking.map((jugador, index) => (
          <div
            key={index}
            className={`flex justify-between items-center p-3 rounded-xl ${
              index === 0
                ? "bg-yellow-500 text-black font-bold shadow-lg"
                : index === 1
                ? "bg-gray-300 text-black font-semibold shadow-md"
                : index === 2
                ? "bg-orange-400 text-black font-semibold shadow-md"
                : "bg-white bg-opacity-10"
            }`}
          >
            <span>
              #{index + 1} {jugador.nombre}
            </span>
            <span className="font-semibold flex items-center"><img src="/img/ColaPoints.png" alt="" width={20} />{jugador.cocas} cocas</span>
          </div>
        ))}
      </div>
    </div>
  );
}
