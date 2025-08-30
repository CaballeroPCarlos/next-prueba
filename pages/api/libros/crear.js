import { prisma } from "@/lib/prisma";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  try {
    const { titulo, autor, anio } = req.body;
    const nuevoLibro = await prisma.libro.create({
      data: { titulo, autor, anio: Number(anio) },
    });
    res.status(201).json(nuevoLibro);
  } catch (error) {
    console.error("Error en /api/libros/crear:", error);
    res.status(500).json({ error: "No se pudo crear el libro" });
  }
}
