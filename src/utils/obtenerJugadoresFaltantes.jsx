export default function obtenerJugadoresFaltantes(tipo) {
  switch (tipo) {
    case 1:
      return "Falta un jugador";
    case 2:
      return "Falta una pareja";
    case 3:
      return "Busco un partido";
    case 0:
    default:
      return "Completo";
  }
}
