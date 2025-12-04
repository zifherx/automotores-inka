import { cn } from "@/lib/utils";
import { iVideosYoutube } from "@/types";

export function VideosYoutube(props: iVideosYoutube) {
  const { className, title, src } = props;

  return (
    <iframe
      className={cn("rounded-xl", className)}
      width="100%"
      height="100%"
      src={src}
      title={title}
      allowFullScreen
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      referrerPolicy="strict-origin-when-cross-origin"
      loading="lazy"
    />
  );
}
