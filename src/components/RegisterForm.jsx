"use client";
import { useState } from "react";

export default function RegisterForm({ toggle, handleRegister }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!name.trim()) {
      setError("El nombre es obligatorio.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("El email no es válido.");
      return;
    }

    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres.");
      return;
    }

    try {
      setLoading(true);
      await handleRegister(name, email, password);
    } catch (err) {
      console.error("Error al registrar:", err.code, err.message);
      switch (err.code) {
        case "auth/email-already-in-use":
          setError("Este email ya está registrado.");
          break;
        case "auth/weak-password":
          setError("La contraseña debe tener al menos 6 caracteres.");
          break;
        default:
          setError("Error al registrar. Por favor, intenta nuevamente.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={onSubmit}
      className="w-full max-w-xs mx-auto p-6 space-y-4 rounded-lg shadow-lg bg-black text-white"
    >
      <h1 className="text-2xl sm:text-3xl font-bold text-center">Crear Cuenta</h1>
      <p className="text-gray-400 text-center">Ingresa PorLaCoca hoy</p>

      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Nombre"
        className="w-full p-3 rounded-xl bg-black border-2 border-white text-white"
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        className="w-full p-3 rounded-xl bg-black border-2 border-white text-white"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Contraseña"
        className="w-full p-3 rounded-xl bg-black border-2 border-white text-white"
        required
      />

      {error && <p className="text-red-500 text-center">{error}</p>}

      <button
        type="submit"
        className="w-full p-3 bg-white text-black rounded-lg font-semibold"
        disabled={loading}
      >
        {loading ? "Cargando..." : "Registrarse"}
      </button>

      <p className="text-center text-gray-400">
        Ya tienes una cuenta?{" "}
        <span
          onClick={toggle}
          className="text-blue-400 cursor-pointer hover:underline"
        >
          Iniciar sesión
        </span>
      </p>
    </form>
  );
}
