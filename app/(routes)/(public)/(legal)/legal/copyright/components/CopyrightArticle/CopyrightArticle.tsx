import { ParrafoSection } from "@/components/Shared/ParrafoSection";
import { Title } from "@/components/Shared/Title";
import { listCopyright } from "@/data/public.data";

export function CopyrightArticle() {
  return (
    <div className="max-w-5xl mx-auto p-4 md:p-8 flex flex-col gap-y-5">
      <Title
        title="Propiedad Intelectual"
        className="text-center text-blueInka text-2xl font-extrabold uppercase"
      />
      {listCopyright.map(({ id, title, parrafos }) => (
        <ParrafoSection key={id} title={title} parrafos={parrafos} />
      ))}
    </div>
  );
}
