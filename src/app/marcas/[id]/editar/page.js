"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import toast from "react-hot-toast";
import { FiSave, FiX } from "react-icons/fi";

export default function EditarMarcaPage() {
  const router = useRouter();
  const params = useParams();
  const { id } = params;

  const [marca, setMarca] = useState({
    nombre: "",
    titular: "",
    estado: "",
    descripcion: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Cargar datos de la marca
  useEffect(() => {
    const fetchMarca = async () => {
      try {
        const res = await fetch(`http://127.0.0.1:8000/marcas/${id}`);
        if (!res.ok) throw new Error("Error al obtener la marca");
        const data = await res.json();
        setMarca({
          nombre: data.nombre,
          titular: data.titular,
          estado: data.estado,
          descripcion: data.descripcion || "",
        });
      } catch (err) {
        console.error(err);
        toast.error("❌ No se pudo cargar la marca");
        router.push("/marcas");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchMarca();
  }, [id, router]);

  // Guardar cambios
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const res = await fetch(`http://127.0.0.1:8000/marcas/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(marca),
      });
      if (!res.ok) throw new Error("Error al actualizar la marca");

      toast.success("✅ Marca actualizada correctamente");
      router.push("/marcas");
    } catch (err) {
      console.error(err);
      toast.error("❌ Hubo un error al actualizar la marca");
    } finally {
      setSaving(false);
    }
  };

  // Skeleton Loader
  if (loading) {
    return (
      <div className="max-w-xl mx-auto bg-white shadow-md rounded-lg p-6 animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
        <div className="space-y-4">
          <div className="h-10 bg-gray-200 rounded"></div>
          <div className="h-10 bg-gray-200 rounded"></div>
          <div className="h-10 bg-gray-200 rounded"></div>
          <div className="h-24 bg-gray-200 rounded"></div>
          <div className="flex justify-end space-x-4">
            <div className="h-10 w-24 bg-gray-200 rounded"></div>
            <div className="h-10 w-32 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto bg-white shadow-lg rounded-lg p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        ✏️ Editar Marca
      </h1>
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Nombre */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Nombre <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={marca.nombre}
            onChange={(e) => setMarca({ ...marca, nombre: e.target.value })}
            className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Titular */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Titular <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={marca.titular}
            onChange={(e) => setMarca({ ...marca, titular: e.target.value })}
            className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Estado */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Estado <span className="text-red-500">*</span>
          </label>
          <select
            value={marca.estado}
            onChange={(e) => setMarca({ ...marca, estado: e.target.value })}
            className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Selecciona un estado</option>
            <option value="activo">Activo</option>
            <option value="inactivo">Inactivo</option>
          </select>
        </div>

        {/* Descripción */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Descripción
          </label>
          <textarea
            value={marca.descripcion}
            onChange={(e) => setMarca({ ...marca, descripcion: e.target.value })}
            className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="4"
          />
        </div>

        {/* Botones */}
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => router.push("/marcas")}
            className="flex items-center gap-2 px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition"
          >
            <FiX /> Cancelar
          </button>
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition disabled:opacity-50"
          >
            <FiSave />
            {saving ? "Guardando..." : "Guardar Cambios"}
          </button>
        </div>
      </form>
    </div>
  );
}
