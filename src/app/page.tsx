// import Image from "next/image";
import { GET, addIntervenant } from "@/lib/requests";


import prisma from "@/lib/db";

export default async function IntervenantPage() {
  const data = await GET();
  const intervenants = Array.isArray(data) ? data : [];

  return (
    <div className="p-4 flex flex-col gap-4">
      <h1>Intervenants</h1>
      <ul className="flex flex-col gap-2">
        {intervenants.map((intervenant: any) => (
          <li className="bg-white rounded-md p-2 text-black flex justify-center items-center" key={intervenant.id}>
            <strong>{intervenant.name}</strong>
            <p>{intervenant.email}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}