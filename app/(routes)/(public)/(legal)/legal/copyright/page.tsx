import type { Metadata } from "next";
import { CopyrightArticle } from "./components/CopyrightArticle";

export const metadata: Metadata = {
  title: {
    default: "Copyright",
    template: "",
  },
};

export default function CopyrightPage() {
  return (
    <>
      <CopyrightArticle />
    </>
  );
}
