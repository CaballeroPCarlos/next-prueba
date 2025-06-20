import { prisma } from "@/lib/prisma";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { nombre, edad } = req.body;

    if (!nombre || !edad) {
      return res.status(400).json({ error: "Datos incompletos" });
    }

    const persona = await prisma.persona.create({
      data: { nombre, edad: parseInt(edad) },
    });

    return res.status(201).json(persona);
  }

  res.status(405).json({ error: "Método no permitido" });
}
