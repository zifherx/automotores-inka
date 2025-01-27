import { redirect } from "next/navigation";

import { auth } from "@clerk/nextjs/server";

import { BtnAddBrand } from "./components/BtnAddBrand";
import { ListBrands } from "./components/ListBrands";

import { dbConnect, isAdministrator, serializeDocument } from "@/lib";
import Marca from "@/models/Marca";

async function loadBrands() {
  await dbConnect();
  const query = await Marca.find();
  return query.map(serializeDocument);
}

export default async function BrandsPage() {
  const { userId } = await auth();

  if (!userId || !isAdministrator(userId)) {
    return redirect("/");
  }

  const query = await loadBrands();

  return (
    <>
      <div className="flex justify-between mb-2">
        <h2 className="flex items-center gap-1 text-xl md:text-3xl font-headMedium">
          Gestión de Marcas -{" "}
          {query.length === 0 ? <p> nulo 😭</p> : <p>{query.length} 😍</p>}
        </h2>
        <BtnAddBrand />
      </div>
      <ListBrands brands={query} />
    </>
  );
}
