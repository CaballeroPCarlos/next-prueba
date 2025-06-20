import { prisma } from "@/lib/prisma";

export default async function handler(req, res) {
  const personas = await prisma.persona.findMany();
  res.status(200).json(personas);
}
