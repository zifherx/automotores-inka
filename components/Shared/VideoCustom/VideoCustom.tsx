import { VideosYoutube } from "../VideosYoutube";
import { tCustomvideo } from "@/types";

export function VideoCustom({
  title,
  parrafo,
  bgSection,
  uriVideoYoutube,
}: tCustomvideo) {
  const playlistYoutubeVideo = uriVideoYoutube.split("?")[0];

  return (
    <section
      className={`bg-slate-300 w-full ${bgSection} bg-cover bg-center bg-no-repeat`}
    >
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-[60%,1fr] text-black px-4 py-8 md:px-0 md:py-10">
        <div className="p-0">
          <VideosYoutube
            className="h-[400px]"
            src={`https://www.youtube.com/embed/${uriVideoYoutube}&amp;controls=0&amp;playlist=${playlistYoutubeVideo}&amp;loop=1`}
            title={title}
          />
        </div>
        <div className="flex flex-col items-start justify-center mt-5 md:ml-8">
          <h2 className="text-xl md:text-2xl font-extrabold md:font-bold mb-3 md:mb-5">
            {title}
          </h2>
          {Array.isArray(parrafo) ? (
            parrafo.map((item, index) => (
              <p
                key={index}
                className="text-sm md:text-base text-justify font-normal"
              >
                {item}
              </p>
            ))
          ) : (
            <p className="text-sm md:text-base text-justify font-normal">
              {parrafo}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
