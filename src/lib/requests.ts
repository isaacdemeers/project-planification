import prisma from "@/lib/prisma"

export async function GET() {
  try {
    const intervenants = await prisma.intervenant.findMany()
    return Response.json(intervenants)
  } catch (error) {
    return Response.json({ error: "Erreur lors de la récupération des intervenants" }, { status: 500 })
  }
} 

// Ajouter un intervenant
export async function addIntervenant(request: Request) {
  const body = await request.json()
  const intervenant = await prisma.intervenant.create({
    data: body
  })
  return Response.json(intervenant)
}