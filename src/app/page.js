"use client";

import { useRouter } from "next/navigation";
import { FiDatabase, FiPlusCircle, FiCode } from "react-icons/fi";
import { FaRegistered } from "react-icons/fa";

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <section className="relative bg-white text-gray-800 py-20 px-6 overflow-hidden border-b shadow-sm">
        <div className="relative max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-blue-600 p-6 rounded-full shadow-xl">
              <FaRegistered className="text-white text-6xl" />
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight">
            Bienvenido a la{" "}
            <span className="text-blue-600">Gestión de Marcas</span> 🚀
          </h1>

          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            Administra tus marcas de forma rápida, profesional y eficiente con
            un sistema moderno basado en <strong>FastAPI</strong> +{" "}
            <strong>Next.js</strong>.
          </p>

          <div className="mt-8">
            <button
              onClick={() => router.push("/marcas/nuevo/step1")}
              className="bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg shadow hover:bg-blue-700 transition"
            >
              + Registrar Nueva Marca
            </button>
          </div>
        </div>
      </section>

      {/* Acciones principales */}
      <main className="flex-grow max-w-5xl mx-auto w-full p-8">
        <div className="grid md:grid-cols-2 gap-8">
          <div
            onClick={() => router.push("/marcas")}
            className="cursor-pointer bg-white shadow rounded-xl p-6 hover:shadow-lg transition flex flex-col items-center border border-gray-100"
          >
            <FiDatabase className="text-blue-600 text-4xl mb-3" />
            <h2 className="text-xl font-bold text-gray-800 mb-2">
              Marcas Registradas
            </h2>
            <p className="text-gray-600 text-center">
              Consulta, edita o elimina las marcas que tienes registradas en el
              sistema.
            </p>
          </div>

          <div
            onClick={() => router.push("/marcas/nuevo/step1")}
            className="cursor-pointer bg-white shadow rounded-xl p-6 hover:shadow-lg transition flex flex-col items-center border border-gray-100"
          >
            <FiPlusCircle className="text-green-600 text-4xl mb-3" />
            <h2 className="text-xl font-bold text-gray-800 mb-2">
              Registrar Nueva Marca
            </h2>
            <p className="text-gray-600 text-center">
              Inicia un flujo guiado en 3 pasos para registrar una nueva marca
              fácilmente.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-100 border-t py-4">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center px-6 text-sm text-gray-600">
          <p>
            © {new Date().getFullYear()} Gestión de Marcas. Todos los derechos
            reservados.
          </p>
          <div className="flex items-center space-x-2 mt-2 md:mt-0">
            <FiCode className="text-blue-600" />
            <span>
              Desarrollado con <strong>Next.js</strong> +{" "}
              <strong>FastAPI</strong>
            </span>
            <span className="ml-4 text-gray-500">v1.0.0</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
