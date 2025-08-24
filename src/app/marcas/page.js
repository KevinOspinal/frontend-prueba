"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { FiEdit, FiTrash2, FiPlusCircle } from "react-icons/fi";

export default function MarcasPage() {
  const router = useRouter();
  const [marcas, setMarcas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [marcaToDelete, setMarcaToDelete] = useState(null);

  // Cargar marcas desde el backend
  const fetchMarcas = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/marcas/");
      const data = await response.json();
      setMarcas(data);
    } catch (err) {
      toast.error("❌ Error al cargar las marcas");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMarcas();
  }, []);

  // Abrir modal
  const openDeleteModal = (id) => {
    setMarcaToDelete(id);
    setModalOpen(true);
  };

  // Confirmar eliminación
  const confirmDelete = async () => {
    if (!marcaToDelete) return;
    setDeletingId(marcaToDelete);

    try {
      const response = await fetch(`http://127.0.0.1:8000/marcas/${marcaToDelete}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Error al eliminar marca");

      setMarcas(marcas.filter((m) => m.id !== marcaToDelete));
      toast.success("✅ Marca eliminada correctamente");
    } catch (err) {
      toast.error("❌ Hubo un error al eliminar la marca");
    } finally {
      setDeletingId(null);
      setModalOpen(false);
      setMarcaToDelete(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Encabezado */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-extrabold text-gray-800 flex items-center gap-2">
          📋 Marcas Registradas
        </h1>
        <button
          onClick={() => router.push("/marcas/nuevo/step1")}
          className="flex items-center gap-2 px-6 py-2 bg-green-600 text-white font-semibold rounded-lg shadow hover:bg-green-700 transition"
        >
          <FiPlusCircle /> Nueva Marca
        </button>
      </div>

      {/* Tabla */}
      {loading ? (
        <p className="text-gray-500 text-center py-10">⏳ Cargando marcas...</p>
      ) : marcas.length === 0 ? (
        <p className="text-gray-500 text-center py-10">
          ⚠️ No hay marcas registradas todavía.
        </p>
      ) : (
        <div className="overflow-x-auto bg-white shadow rounded-lg">
          <table className="w-full border-collapse">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-gray-700 font-semibold">#</th>
                <th className="px-6 py-3 text-left text-gray-700 font-semibold">Nombre</th>
                <th className="px-6 py-3 text-left text-gray-700 font-semibold">Titular</th>
                <th className="px-6 py-3 text-left text-gray-700 font-semibold">Estado</th>
                <th className="px-6 py-3 text-left text-gray-700 font-semibold">Descripción</th>
                <th className="px-6 py-3 text-center text-gray-700 font-semibold">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {marcas.map((marca) => (
                <tr key={marca.id} className="border-t hover:bg-gray-50 transition">
                  <td className="px-6 py-3">{marca.id}</td>
                  <td className="px-6 py-3 font-medium text-gray-800">{marca.nombre}</td>
                  <td className="px-6 py-3 text-gray-600">{marca.titular}</td>
                  <td className="px-6 py-3">
                    <span
                      className={`px-3 py-1 text-sm rounded-full ${
                        marca.estado === "Activo"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {marca.estado}
                    </span>
                  </td>
                  <td className="px-6 py-3 text-gray-600">{marca.descripcion || "—"}</td>
                  <td className="px-6 py-3 text-center space-x-3">
                    <button
                      onClick={() => router.push(`/marcas/${marca.id}/editar/`)}
                      className="inline-flex items-center gap-1 px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition"
                    >
                      <FiEdit /> Editar
                    </button>
                    <button
                      onClick={() => openDeleteModal(marca.id)}
                      disabled={deletingId === marca.id}
                      className={`inline-flex items-center gap-1 px-3 py-1 text-sm rounded transition ${
                        deletingId === marca.id
                          ? "bg-red-400 text-white cursor-not-allowed"
                          : "bg-red-600 text-white hover:bg-red-700"
                      }`}
                    >
                      <FiTrash2 />
                      {deletingId === marca.id ? "Eliminando..." : "Eliminar"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal de Confirmación */}
      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full animate-fadeIn">
            <h2 className="text-lg font-bold text-gray-800 mb-4">
              ⚠️ Confirmar eliminación
            </h2>
            <p className="text-gray-600 mb-6">
              ¿Estás seguro de que deseas eliminar esta marca? <br />
              <span className="font-semibold text-red-600">
                Esta acción no se puede deshacer.
              </span>
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setModalOpen(false)}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition"
              >
                Cancelar
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
              >
                Sí, eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
