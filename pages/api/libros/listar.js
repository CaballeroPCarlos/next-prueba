import { prisma } from "@/lib/prisma";

export default async function handler(req, res) {
  try {
    const libros = await prisma.libro.findMany({
      orderBy: { id: "desc" }, // más recientes primero
    });
    res.status(200).json(libros);
  } catch (error) {
    console.error("Error en /api/libros/listar:", error);
    res.status(500).json({ error: "No se pudieron obtener los libros" });
  }
}
