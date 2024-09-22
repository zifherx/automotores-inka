import Image from "next/image";
import Link from "next/link";

export function LogoDashboard() {
  return (
    <Link
      href="/dashboard"
      className="flex flex-col items-center justify-center h-20 gap-3 border-b cursor-pointer min-h-20"
    >
      <Image
        src="/images/logo-color.png"
        alt="Automotores Inka Logo"
        width={250}
        height={40}
        priority
      />
      <h1>By Ziphonex</h1>
    </Link>
  );
}
