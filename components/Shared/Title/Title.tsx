import { cn } from "@/lib/utils";
import { iTitle } from "@/types";

export function Title(props: iTitle) {
  const { className, title } = props;

  return <h2 className={cn("font-headBold", className)}>{title}</h2>;
}
