import {
  collection,
  addDoc,
  doc,
  updateDoc,
  setDoc,
  getDoc,
  arrayUnion,
  serverTimestamp
} from "firebase/firestore";
import { db } from "../../lib/firebase";

export const crearPartido = async (partidoData, creadorUid) => {
  try {
    // 1. Crear el partido
    const docRef = await addDoc(collection(db, "partidos"), {
      ...partidoData,
      estado: "Abierto",
      createdAt: serverTimestamp(),
    });

    console.log("✅ Partido creado con ID:", docRef.id);

    // 2. Obtener referencia al usuario
    const userRef = doc(db, "users", creadorUid);
    const userSnap = await getDoc(userRef);

    // 3. Agregar el partido al campo "partidosCreados"
    if (userSnap.exists()) {
      await updateDoc(userRef, {
        partidosCreados: arrayUnion(docRef.id),
      });
    } else {
      await setDoc(userRef, {
        partidosCreados: [docRef.id],
      });
    }

    return docRef.id;

  } catch (error) {
    console.error("❌ Error creando el partido:", error);
  }
};
