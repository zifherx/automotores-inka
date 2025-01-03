import { Title } from "../Title";

import { iParrafo } from "@/types";

export function ParrafoSection(props: iParrafo) {
  const { parrafos, title } = props;

  return (
    <div>
      {title !== "" && (
        <Title
          title={title}
          className="text-blueInka mb-4 text-lg text-left font-extrabold"
        />
      )}

      <div className="text-base font-normal flex flex-col gap-y-5 leading-7 text-justify text-grisDarkInka">
        {parrafos.map(({ oracion }, index) => (
          <p key={index}>{oracion}</p>
        ))}
      </div>
    </div>
  );
}
