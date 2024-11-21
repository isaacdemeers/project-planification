
// import Image from "next/image";
// import { GET, addIntervenant } from "@/lib/requests";
// import { prisma } from "@/lib/prisma";

// export default async function Home() {
//   const intervenants = await GET();
//   return (
//     <div>
//       <h1>Hello World</h1>
//       {/* <button onClick={() => addIntervenant({ name: "John Doe", email: "john.doe@example.com" } as any)}>Ajouter un intervenant</button> */}
//       {JSON.stringify(intervenants)}
//     </div>
//   );
// }


import prisma from "@/lib/prisma";

export default async function IntervenantPage() {
  const intervenants = await prisma.intervenant.findMany();

  return (
    <div>
      <h1>Liste des intervenants</h1>
      <ul>
        {intervenants.map((intervenant) => (
          <li className="bg-white rounded-md p-2" key={intervenant.id}>
            <strong>{intervenant.name}</strong> - {intervenant.email}
          </li>
        ))}
      </ul>
    </div>
  );
}