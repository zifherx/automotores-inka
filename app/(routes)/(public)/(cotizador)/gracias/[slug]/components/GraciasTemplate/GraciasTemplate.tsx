"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { CustomMessage } from "../CustomMessage";

export function GraciasTemplate() {
  const router = useRouter();
  const params = useParams();
  const { slug } = params;

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/");
    }, 6000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-grisInka/35">
      <CustomMessage
        message={`${slug}`}
        volverInicio={() => router.push("/")}
      />
    </div>
  );
}
