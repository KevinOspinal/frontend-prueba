const API_URL = "http://127.0.0.1:8000/docs"; // URL backend FastAPI

export async function getMarcas() {
  const res = await fetch(`${API_URL}/marcas`);
  if (!res.ok) throw new Error("Error al obtener marcas");
  return res.json();
}

export async function getMarca(id) {
  const res = await fetch(`${API_URL}/marcas/${id}`);
  if (!res.ok) throw new Error("Marca no encontrada");
  return res.json();
}

export async function createMarca(data) {
  const res = await fetch(`${API_URL}/marcas`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Error al crear marca");
  return res.json();
}

export async function updateMarca(id, data) {
  const res = await fetch(`${API_URL}/marcas/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Error al actualizar marca");
  return res.json();
}

export async function deleteMarca(id) {
  const res = await fetch(`${API_URL}/marcas/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Error al eliminar marca");
  return res.json();
}
