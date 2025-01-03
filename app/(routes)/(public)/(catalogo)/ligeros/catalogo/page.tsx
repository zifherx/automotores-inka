import { Metadata } from "next";

import { CatalogoVehicular } from "./components/CatalogoVehicular";

export const metadata: Metadata = {
  title: {
    template: "",
    default: "Catálogo",
  },
};

export default async function CatalogoPage() {
  return (
    <>
      <CatalogoVehicular />
    </>
  );
}
