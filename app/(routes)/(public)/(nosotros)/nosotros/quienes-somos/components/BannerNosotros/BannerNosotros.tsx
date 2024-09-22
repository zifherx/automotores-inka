import { VideosYoutube } from "@/components/Shared/VideosYoutube";

export function BannerNosotros() {
  return (
    <div className="w-full bg-black p-0 opacity-95">
      <VideosYoutube
        className="aspect-video w-auto md:w-full md:h-[720px] object-none"
        src="https://www.youtube.com/embed/_fj9zTEF8Ss?si=DFBpjlSs1C50ja_h&amp;controls=0&amp;start=1&amp;autoplay=1&amp;playlist=_fj9zTEF8Ss&amp;loop=1&amp;rel=0"
        title="Cl+uster Automotriz más grande del norte del país"
      />
    </div>
  );
}
