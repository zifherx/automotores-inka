import { Title } from "@/components/Shared/Title";

import { CardObjetivos } from "./CardObjetivos";

import { listObjetivosEmpresa } from "@/data/public.data";

export function EmpresaSection() {
  return (
    <div className="max-w-5xl mx-auto p-6 md:p-0 md:py-16 flex flex-col">
      <div>
        <Title
          title="La Empresa"
          className="text-center text-2xl uppercase font-extrabold text-grisDarkInka"
        />
        <div className="text-justify leading-7 my-6 font-light">
          <p>
            Automotores Inka S.A.C. es una de las redes de concesionario
            multimarca más grande del Perú.
          </p>
          <p>
            Los altos estándares alcanzados en todos nuestros procesos nos han
            llevado a ser considerados modelo de concesionario en el mundo.
          </p>
          <p>
            Trabajamos comprometidos en ofrecer un buen servicio a nuestros
            clientes, realizando todas nuestras actividades basándonos en la
            productividad, transparencia y el cliente primero. Esta imagen es
            posible gracias al trabajo constante y profesional de cada miembro
            de nuestra organización porque para nosotros el cliente es parte de
            nuestra familia.
          </p>
        </div>
      </div>

      <div className="grid grid-col-1 md:grid-cols-3 md:gap-5">
        {listObjetivosEmpresa.map(
          ({ description, id, title, bgDescription, imageUrl }) => (
            <CardObjetivos
              key={id}
              bgDescription={bgDescription}
              title={title}
              description={description}
              imageUrl={imageUrl}
            />
          )
        )}
      </div>
    </div>
  );
}
