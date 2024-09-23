import { redirect } from "next/navigation";

import { auth } from "@clerk/nextjs/server";

import { BtnAddCover } from "./components/BtnAddCover";
import { ListCovers } from "./components/ListCovers";

import { dbConnect, serializeDocument, isAdministrator } from "@/lib";
import Cover from "@/models/Cover";

async function loadCovers() {
  await dbConnect();
  const query = await Cover.find();
  return query.map(serializeDocument);
}

export default async function CoversPage() {
  const { userId } = auth();

  if (!userId || !isAdministrator(userId)) {
    return redirect("/");
  }

  const query = await loadCovers();

  return (
    <>
      <div className="flex justify-between mb-5">
        <h2 className="flex items-center gap-1 text-xl md:text-3xl font-headMedium">
          Gestión de Portadas -
          {query.length === 0 ? <p> nulo 😭</p> : <p>{query.length} 😍</p>}
        </h2>
        <BtnAddCover />
      </div>
      <ListCovers covers={query} />
    </>
  );
}
