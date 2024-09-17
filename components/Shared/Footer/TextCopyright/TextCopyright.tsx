import Link from "next/link";

export function TextCopyright() {
  const actualYear = new Date().getFullYear();

  return (
    <div className="flex flex-col md:flex-row items-center justify-center md:justify-between text-xs text-grisDarkInka">
      <p className="text-left">
        &copy; {actualYear} SOCIEDAD AUTOMOTORES INKA S.A.C.
      </p>
      <p className="uppercase text-right">
        DISEÑADO POR &nbsp;
        <Link href="https://ziphonex.com" className="font-bold">
          Ziphonex
        </Link>
      </p>
    </div>
  );
}
