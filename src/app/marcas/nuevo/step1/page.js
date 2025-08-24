"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function Step1() {
  const router = useRouter();
  const [nombre, setNombre] = useState("");
  const [estado, setEstado] = useState("");
  const [error, setError] = useState("");

  const handleNext = () => {
    if (!nombre.trim()) {
      setError("⚠️ Por favor ingresa un nombre de marca");
      toast.error("Debes ingresar un nombre de marca");
      return;
    }

    if (!estado) {
      toast.error("⚠️ Debes seleccionar un estado");
      return;
    }

    // Guardamos en localStorage para usarlo en los otros pasos
    localStorage.setItem("marca_nombre", nombre);
    localStorage.setItem("marca_estado", estado);

    router.push("/marcas/nuevo/step2");
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      {/* Encabezado */}
      <h1 className="text-3xl font-bold text-gray-800">
        Registro de Marca - Paso 1
      </h1>
      <p className="text-gray-600">
        Ingresa el nombre de la marca y selecciona su estado.
      </p>

      {/* Barra de Progreso */}
      <div className="flex items-center justify-between">
        <div className="flex-1 h-2 bg-red-600 rounded-full"></div>
        <div className="flex-1 h-2 bg-gray-300 rounded-full"></div>
        <div className="flex-1 h-2 bg-gray-300 rounded-full"></div>
      </div>
      <div className="flex justify-between text-sm text-gray-600">
        <span>Marca</span>
        <span>Titular</span>
        <span>Resumen</span>
      </div>

      {/* Formulario */}
      <div className="bg-white shadow-md rounded-lg p-6 space-y-4">
        {/* Nombre */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Marca a Registrar
          </label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => {
              setNombre(e.target.value);
              setError("");
            }}
            placeholder="Ej: Coca-Cola"
            className={`w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 ${
              error
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-red-500"
            }`}
          />
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </div>

        {/* Estado */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Estado
          </label>
          <select
            value={estado}
            onChange={(e) => setEstado(e.target.value)}
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            <option value="">Selecciona un estado</option>
            <option value="activo">Activo</option>
            <option value="inactivo">Inactivo</option>
          </select>
        </div>
      </div>

      {/* Botón continuar */}
      <div className="flex justify-end">
        <button
          onClick={handleNext}
          className="px-6 py-2 bg-red-600 text-white font-semibold rounded-lg shadow hover:bg-red-700 transition"
        >
          Continuar →
        </button>
      </div>
    </div>
  );
}
