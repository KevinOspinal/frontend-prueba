"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

// 👇 Importamos la API centralizada
import { createMarca } from "@/app/lib/api";

export default function Step3() {
  const router = useRouter();
  const [nombre, setNombre] = useState("");
  const [titular, setTitular] = useState("");
  const [estado, setEstado] = useState("Activo"); // por defecto "Activo"
  const [descripcion, setDescripcion] = useState("");

  useEffect(() => {
    setNombre(localStorage.getItem("marca_nombre") || "");
    setTitular(localStorage.getItem("marca_titular") || "");
    setEstado(localStorage.getItem("marca_estado") || "Activo");
  }, []);

  const handleBack = () => {
    router.push("/marcas/nuevo/step2");
  };

  const handleConfirm = async () => {
    if (!nombre || !titular || !estado) {
      toast.error("⚠️ Faltan datos, por favor completa los pasos previos");
      router.push("/marcas/nuevo/step1");
      return;
    }

    try {
      // 🔹 Usamos createMarca en lugar de fetch directo
      await createMarca({
        nombre,
        titular,
        estado,
        descripcion: descripcion || null,
      });

      toast.success("✅ Marca registrada exitosamente");

      // limpiar storage temporal del formulario
      localStorage.removeItem("marca_nombre");
      localStorage.removeItem("marca_titular");
      localStorage.removeItem("marca_estado");

      router.push("/marcas");
    } catch (err) {
      console.error(err);
      toast.error("❌ Error al registrar la marca");
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold text-gray-800">
        Registro de Marca - Resumen
      </h1>
      <p className="text-gray-600">
        Verifica que los datos sean correctos antes de confirmar.
      </p>

      {/* Barra de progreso */}
      <div className="flex items-center justify-between">
        <div className="flex-1 h-2 bg-red-600 rounded-full"></div>
        <div className="flex-1 h-2 bg-red-600 rounded-full"></div>
        <div className="flex-1 h-2 bg-red-600 rounded-full"></div>
      </div>
      <div className="flex justify-between text-sm text-gray-600">
        <span>Marca</span>
        <span>Titular</span>
        <span className="font-semibold">Resumen</span>
      </div>

      {/* Resumen */}
      <div className="bg-white shadow-md rounded-lg p-6 space-y-4">
        <div>
          <h2 className="text-gray-700 font-semibold">Marca:</h2>
          <p className="text-gray-900">{nombre}</p>
        </div>
        <div>
          <h2 className="text-gray-700 font-semibold">Titular:</h2>
          <p className="text-gray-900">{titular}</p>
        </div>
        <div>
          <h2 className="text-gray-700 font-semibold">Estado:</h2>
          <p className="text-gray-900">{estado}</p>
        </div>
        <div>
          <h2 className="text-gray-700 font-semibold">Descripción:</h2>
          <textarea
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            rows="3"
            placeholder="Opcional"
          />
        </div>
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
          onClick={handleConfirm}
          className="px-6 py-2 bg-green-600 text-white font-semibold rounded-lg shadow hover:bg-green-700 transition"
        >
          Confirmar ✔
        </button>
      </div>
    </div>
  );
}
