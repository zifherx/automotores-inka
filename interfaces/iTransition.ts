import { ReactNode } from "react";

export type RevealProps = {
  children: ReactNode;
  className?: string;
  position: "right" | "bottom";
  delay?: number;
};
