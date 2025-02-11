import { Fragment } from "react";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";

import { BtnAddNoticia } from "./components/BtnAddNoticia";
import { ListNoticias } from "./components/ListNoticias";

import { dbConnect, isAdministrator } from "@/lib";
import { Noticia } from "@/models/Noticia";

async function loadNoticias() {
  await dbConnect();
  // const query = await Noticia.find({}).lean();
  const query = await Noticia.find({});
  return query;
}

export default async function AdminNewsPage() {
  const { userId } = await auth();
  if (!userId || !isAdministrator(userId)) {
    return redirect("/");
  }

  const query = await loadNoticias();

  console.log("####QUERY:", query);

  return (
    <Fragment>
      <div className="flex justify-between">
        <h2 className="flex items-center gap-1 text-xl md:text-3xl font-headMedium">
          Gestión de Noticias
        </h2>
        <BtnAddNoticia />
      </div>
      <ListNoticias />
    </Fragment>
  );
}
