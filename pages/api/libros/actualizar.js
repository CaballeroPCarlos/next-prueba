import { prisma } from "@/lib/prisma";

export default async function handler(req, res) {
  if (req.method !== "PUT") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  try {
    const { id, titulo, autor, anio } = req.body;
    const libroActualizado = await prisma.libro.update({
      where: { id: Number(id) },
      data: { titulo, autor, anio: Number(anio) },
    });
    res.status(200).json(libroActualizado);
  } catch (error) {
    console.error("Error en /api/libros/actualizar:", error);
    res.status(500).json({ error: "No se pudo actualizar el libro" });
  }
}
