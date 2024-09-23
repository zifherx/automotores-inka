"use client";

import { useParams, useRouter } from "next/navigation";

import { CustomMessage } from "../CustomMessage";
import { useEffect } from "react";

export function GraciasTemplate() {
  const router = useRouter();
  const params = useParams();
  const { slug } = params;

  useEffect(() => {
    const timer = setTimeout(() => {
        router.push("/")
    }, 6000)

    return () => clearTimeout(timer)
  }, [router]);

  return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-400 via-pink-500 to-red-500">
        <CustomMessage message={`${slug}`}/>
    </div>
  );
}
