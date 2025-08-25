import Link from "next/link";

export default function Navbar() {
  return (
    <header className="bg-blue-600 text-white shadow-md px-6 py-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">🚀 Gestión de Marcas</h1>
      <nav>
        <ul className="flex space-x-6">
          <li>
            <Link href="/" className="hover:underline">
              Inicio
            </Link>
          </li>
          <li>
            <Link href="/marcas" className="hover:underline">
              Marcas
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
