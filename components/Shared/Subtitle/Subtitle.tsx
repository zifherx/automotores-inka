import { cn } from "@/lib/utils";
import { iSubtitle } from "@/types";

export function Subtitle(props: iSubtitle) {
  const { subtitle, className } = props;

  return (
    <p
      className={cn(
        `"max-w-lg mt-5 text-center mx-auto text-sm md:text-base leading-tight text-grisDarkInka`,
        className
      )}
    >
      {subtitle}
    </p>
  );
}
