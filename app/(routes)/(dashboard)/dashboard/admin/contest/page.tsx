import { dbConnect, isAdministrator, serializeDocument } from "@/lib";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { ContestDashboardPage } from "./components/ContestDashboardPage";
import Concurso from "@/models/Concurso";

async function loadContest() {
  await dbConnect();
  const query = await Concurso.find({});
  return query.map(serializeDocument);
}

export default async function AdminContestPage() {
  const { userId } = await auth();

  if (!userId || !isAdministrator(userId)) {
    return redirect("/");
  }

  const queryContest = await loadContest();

  return (
    <>
      <ContestDashboardPage contests={queryContest} />
    </>
  );
}
