export function CondicionesFormularios() {
  return (
    <div className="w-full bg-black text-white">
      <div className="max-w-screen-2xl mx-auto">
        <div className="px-8 py-3">
          <p className="leading-tight text-xs text-justify md:text-left">
            (*) Los precios son expresados en dólares americanos y aplican a la
            versión básica e incluyen impuestos vigentes a ala fecha de
            cotización, no incluye adicionales. Los precios en soles son
            calculados en función al Tipo de Cambio vigente, sujeto a
            variaciones. Imágenes y especificaciones varían según versión
            disponible del producto. Para más información revisa los{" "}
            <a
              href="/legal/terminos-condiciones"
              target="_blank"
              className="text-grisInka"
            >
              Términos y Condiciones
            </a>{" "}
            o contacta con tu tienda Automotores Inka de tu preferencia.{" "}
            <a
              href="/nosotros/ubicanos"
              target="_blank"
              className="text-grisInka"
            >
              Ver red Automotores Inka
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
