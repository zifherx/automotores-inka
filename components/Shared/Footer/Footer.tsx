import { EnlacesContacto } from "./EnlacesContacto";
import { MenuFooter } from "./MenuFooter";
import { TextCopyright } from "./TextCopyright";

export function Footer() {
  return (
    <footer className="bg-plomoInka p-4 md:w-full">
      <div className="max-w-6xl mx-auto flex flex-col py-6">
        <EnlacesContacto />
        <MenuFooter />
        <div className="bg-grisInka h-px w-full my-3">&nbsp;</div>
        <TextCopyright />
      </div>
    </footer>
  );
}
