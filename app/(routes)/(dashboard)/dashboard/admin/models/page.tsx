import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";

import { isAdministrator } from "@/lib";

import { ModelDashboardPage } from "./components/ModelDashboardPage";

export default async function ModelsPage() {
  const { userId } = auth();

  if (!userId || !isAdministrator(userId)) {
    return redirect("/");
  }

  return (
    <div>
      <ModelDashboardPage />
    </div>
  );
}
