"use client";
import { useEffect, useState } from "react";
import { db } from "../../lib/firebase"; // tu config
import { collection, onSnapshot } from "firebase/firestore";
import PartidoCard from "./PartidoCard"; // componente que muestra un partido

const ContPartidos = () => {
  const [partidos, setPartidos] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "partidos"), (snapshot) => {
      const lista = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPartidos(lista);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {partidos.length === 0 ? (
        <p className="text-white">No hay partidos publicados.</p>
      ) : (
        partidos.map((partido) => (
          <PartidoCard key={partido.id} partido={partido} />
        ))
      )}
    </div>
  );
};

export default ContPartidos;
