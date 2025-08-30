import { prisma } from "@/lib/prisma";

export default async function handler(req, res) {
  if (req.method !== "DELETE") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  try {
    const { id } = req.body;
    await prisma.libro.delete({
      where: { id: Number(id) },
    });
    res.status(200).json({ message: "Libro eliminado correctamente" });
  } catch (error) {
    console.error("Error en /api/libros/eliminar:", error);
    res.status(500).json({ error: "No se pudo eliminar el libro" });
  }
}
