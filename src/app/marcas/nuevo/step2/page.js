"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function Step2() {
  const router = useRouter();
  const [titular, setTitular] = useState("");
  const [error, setError] = useState("");

  const handleNext = () => {
    if (!titular.trim()) {
      setError("⚠️ Debes ingresar el nombre del titular");
      toast.error("Debes ingresar el titular");
      return;
    }

    // Guardamos titular
    localStorage.setItem("marca_titular", titular);

    // Avanzamos al paso 3
    router.push("/marcas/nuevo/step3");
  };

  const handleBack = () => {
    router.push("/marcas/nuevo/step1");
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      {/* Encabezado */}
      <h1 className="text-3xl font-bold text-gray-800">
        Registro de Marca - Paso 2
      </h1>
      <p className="text-gray-600">Ingresa los datos del titular de la marca.</p>

      {/* Barra de progreso */}
      <div className="flex items-center justify-between">
        <div className="flex-1 h-2 bg-red-600 rounded-full"></div>
        <div className="flex-1 h-2 bg-red-600 rounded-full"></div>
        <div className="flex-1 h-2 bg-gray-300 rounded-full"></div>
      </div>
      <div className="flex justify-between text-sm text-gray-600">
        <span>Marca</span>
        <span className="font-semibold">Titular</span>
        <span>Resumen</span>
      </div>

      {/* Formulario */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Titular de la Marca
        </label>
        <input
          type="text"
          value={titular}
          onChange={(e) => {
            setTitular(e.target.value);
            setError("");
          }}
          placeholder="Ej: Juan Pérez"
          className={`w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 ${
            error
              ? "border-red-500 focus:ring-red-500"
              : "border-gray-300 focus:ring-red-500"
          }`}
        />
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      </div>

      {/* Botones */}
      <div className="flex justify-between">
        <button
          onClick={handleBack}
          className="px-6 py-2 bg-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-400 transition"
        >
          ← Atrás
        </button>
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
