"use client";

import Image from "next/image";
import Link from "next/link";

export function FooterCorporativo() {
  return (
    <section className="w-full">
      <div className="h-1 bg-[#22398C]" />
      <div className="max-w-6xl mx-auto py-5 md:py-10">
        <Link href="/">
          <Image
            src="/images/logo-color.png"
            alt="Logo SAI"
            width={500}
            height={80}
            className="mx-auto"
            priority
          />
        </Link>
      </div>
    </section>
  );
}
