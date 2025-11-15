import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";

import { canAccessADVPanel } from "@/lib";

import { ModelDashboardPage } from "./components/ModelDashboardPage";

export default async function ModelsPage() {
  const { userId } = await auth();

  if (!userId || !canAccessADVPanel(userId)) {
    return redirect("/");
  }

  return (
    <div>
      <ModelDashboardPage />
    </div>
  );
}
