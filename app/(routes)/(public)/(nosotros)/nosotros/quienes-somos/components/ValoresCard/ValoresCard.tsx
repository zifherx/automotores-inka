import { listValores } from "@/data/public.data";

export function ValoresCard() {
  return (
    <div className="max-w-6xl mx-auto mt-10">
      <div className="flex flex-col sm:justify-center md:flex-row md:justify-start gap-x-6">
        {listValores.map(
          ({ descriptionDark, descriptionLight, icon: Icon, id, title }) => (
            <div key={id} className="p-3 w-[300px]">
              <div className="rounded-full bg-blueInka p-4 w-fit flex justify-center mb-4">
                <Icon className="w-10 h-10 text-white" />
              </div>
              <h3 className="font-bold text-xl text-blueInka uppercase">
                {title}
              </h3>
              <div className="text-blueInka text-sm">
                <p className="font-light">{descriptionLight}</p>
                <p className="font-bold">{descriptionDark}</p>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}
