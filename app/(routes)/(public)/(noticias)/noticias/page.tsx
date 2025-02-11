import { Metadata } from "next";

import { NoticiasSection } from "./components/NoticiasSection";

export const metadata: Metadata = {
  title: {
    default: "Noticias",
    template: "",
  },
};

export default function NoticiasStaticPage() {
  return (
    <>
      <NoticiasSection />
    </>
  );
}
