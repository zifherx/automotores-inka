import { Loader2, Sparkles } from "lucide-react";
import { iLoadingIcon } from "@/interfaces";

export function LoadingIcon(props: iLoadingIcon) {
  const { effect } = props;

  switch (effect) {
    case "default":
      return <Loader2 className="mr-2 h-5 w-5 animate-spin" />;
    case "pulse":
      return (
        <div className="mr-2 h-5 w-5 rounded-full bg-white animate-pulse" />
      );
    case "sparkles":
      return <Sparkles className="mr-2 h-5 w-5 animate-spin" />;
  }
}
