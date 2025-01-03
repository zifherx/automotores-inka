import { Metadata } from "next";
import { PageVehicle } from "./components/pageVehicle";

export const metadata: Metadata = {
  title: {
    template: "",
    default: "Modelo",
  },
};

export default async function InternalPageModelo() {
  return (
    <>
      <PageVehicle />
    </>
  );
}
