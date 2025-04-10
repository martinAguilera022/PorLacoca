"use client";
import { useState } from "react";

export default function LoginForm({ toggle, handleLogin, handleGoogleLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const onSubmit = async () => {
    try {
      await handleLogin(email, password);
    } catch (err) {
      setError("Error al iniciar sesión. Verifica tus datos.");
    }
  };

  return (
    <div className="w-full max-w-xs mx-auto p-6 rounded-lg shadow-lg bg-black flex flex-col items-center text-white">
      <h1 className="text-2xl font-bold text-center mb-2">Bienvenido de nuevo</h1>
      <p className="text-gray-400 text-center text-sm mb-4">Entra y juega PorLaCoca</p>

      <div className="w-full flex flex-col gap-3">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full p-3 rounded-xl bg-black border-2 border-white text-white"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Contraseña"
          className="w-full p-3 rounded-xl bg-black border-2 border-white text-white"
        />
      </div>

      {error && <p className="text-red-500 text-sm text-center mt-2">{error}</p>}

      <button
        className="w-full p-3 mt-4 bg-white text-black rounded-lg font-semibold"
        onClick={onSubmit}
      >
        Ingresar
      </button>

      <div className="flex items-center my-4 w-full">
        <hr className="flex-1 border-gray-600" />
        <span className="px-3 text-gray-400 text-sm">o</span>
        <hr className="flex-1 border-gray-600" />
      </div>

      <button
        className="w-full p-3 bg-white text-black rounded-lg font-semibold"
        onClick={handleGoogleLogin}
      >
        G Ingresar con Google
      </button>

      <p className="text-center text-gray-400 text-sm mt-4">
        No tienes una cuenta?{" "}
        <span onClick={toggle} className="text-blue-400 cursor-pointer underline">
          Regístrate
        </span>
      </p>
    </div>
  );
}
