"use client";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();

  const links = [
    { name: "Dashboard", href: "/" },
    { name: "Marcas", href: "/marcas" },
  ];

  return (
    <aside className="w-64 bg-white shadow-md min-h-screen p-4 hidden md:block">
      <h2 className="text-gray-700 font-bold mb-4">Menú</h2>
      <ul className="space-y-2">
        {links.map((link) => (
          <li key={link.href}>
            <a
              href={link.href}
              className={`block px-3 py-2 rounded-md ${
                pathname === link.href
                  ? "bg-blue-600 text-white"
                  : "text-gray-700 hover:bg-gray-200"
              }`}
            >
              {link.name}
            </a>
          </li>
        ))}
      </ul>
    </aside>
  );
}
