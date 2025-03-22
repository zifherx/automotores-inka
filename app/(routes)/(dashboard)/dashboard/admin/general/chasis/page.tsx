import { redirect } from "next/navigation";

import { auth } from "@clerk/nextjs/server";

import { BtnAddChasis } from "./components/BtnAddChasis";
import { ListChasis } from "./components/ListChasis";

import { dbConnect, isAdministrator, serializeDocument } from "@/lib";
import Carroceria from "@/models/Carroceria";

async function loadChasis() {
  await dbConnect();
  const query = await Carroceria.find({});
  return query.map(serializeDocument);
}

export default async function ChasisPage() {
  const { userId } = await auth();

  if (!userId || !isAdministrator(userId)) {
    return redirect("/");
  }

  const query = await loadChasis();

  return (
    <>
      <div className="flex justify-between mb-2">
        <h2 className="flex items-center gap-1 text-xl md:text-3xl font-headMedium">
          Gestión de Carrocería -{" "}
          {query.length === 0 ? <p> nulo 😭</p> : <p>{query.length} 😍</p>}
        </h2>
        <BtnAddChasis />
      </div>
      <ListChasis chasises={query} />
    </>
  );
}
