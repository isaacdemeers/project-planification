import prisma from "@/lib/db"

export async function GET() {
  try {
    const intervenants = await prisma.intervenant.findMany();
    console.log(intervenants);
    return intervenants;
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