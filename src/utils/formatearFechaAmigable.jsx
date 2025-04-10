import {
  format,
  isToday,
  isTomorrow,
} from "date-fns";
import { es } from "date-fns/locale";

// Suponiendo que `fecha` es un string tipo "2025-04-06"
export default function formatearFechaAmigable(fecha) {
  const [year, month, day] = fecha.split("-").map(Number);
  const dateObj = new Date(year, month - 1, day); // fecha local correcta

  if (isToday(dateObj)) {
    return `Hoy`;
  } else if (isTomorrow(dateObj)) {
    return `Mañana`;
  } else if (
    dateObj.getTime() <
    new Date().getTime() + 7 * 24 * 60 * 60 * 1000
  ) {
    return format(dateObj, "EEEE", { locale: es }); // Ej: "domingo"
  } else {
    return format(dateObj, "d 'de' MMMM", { locale: es }); // Ej: "6 de abril"
  }
}

