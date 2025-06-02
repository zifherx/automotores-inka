import type { Metadata } from "next";

import { TalleresView } from "./components/TalleresView";

export const metadata: Metadata = {
  title: {
    default: "Talleres Autorizados",
    template: "",
  },
};

export default function TalleresPage() {
  return (
    <>
      <TalleresView />
    </>
  );
}
