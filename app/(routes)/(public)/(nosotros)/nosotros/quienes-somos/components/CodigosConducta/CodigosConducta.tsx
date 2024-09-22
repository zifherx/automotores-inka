import { Title } from "@/components/Shared/Title";

export function CodigosConducta() {
  return (
    <div className="pb-20">
      <div className="max-w-6xl mx-auto border border-grisInka rounded-lg p-6 bg-plomoInka">
        <Title
          title="CÓDIGOS DE CONDUCTA AUTOMOTORES INKA"
          className="text-center font-bold text-xl uppercase text-grisDarkInka"
        />
        <div className="mt-5 font-base text-grisDarkInka leading-6">
          <ul className="px-10 list-outside list-disc space-y-3">
            <li>
              Es la guía que nos acompaña para llevar a cabo nuestros{" "}
              <strong>negocios de manera correcta.</strong> Rige todas las
              decisiones y acciones, ya sea al interior de nuestra empresa como
              ante el mercado, a la hora de vender nuestros productos y
              relacionarnos con nuestros{" "}
              <strong>
                clientes, proveedores, autoridades y competidores.
              </strong>
            </li>
            <li>
              Cada uno de quienes conforman el equipo de Inchcape está
              comprometido con adoptar y actuar en virtud de estos códigos de
              conducta, manteniendo así una{" "}
              <strong>cultura de excelencia ética.</strong>
            </li>
            <li>
              Automotores Inka es una garantía y un respaldo de{" "}
              <strong>actuar ético para todas las personas</strong> con las que
              nos relacionamos.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
