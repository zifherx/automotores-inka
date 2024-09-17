"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Home } from "lucide-react";

export default function NotFoundPage() {
  const [speed, setSpeed] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSpeed((prevSpeed) => (prevSpeed + 1) % 101);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center text-white p-4">
      <div className="w-full max-w-3xl bg-[#F8F8F8] rounded-lg shadow-xl overflow-hidden">
        <div className="p-8 space-y-6">
          <h1 className="text-4xl md:text-6xl font-headBold text-center text-redInka">
            ¡Error 404!
          </h1>
          <p className="text-xl md:text-2xl text-center text-black font-headMedium">
            ¡Parece que te has salido de la pista!
          </p>

          <div className="relative w-full h-48 bg-white rounded-xl md:rounded-full overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center text-black">
              <svg className="w-full h-full" viewBox="0 0 200 100">
                <path
                  d="M20 90 A 80 80 0 0 1 180 90"
                  fill="none"
                  stroke="#F8F8F8"
                  strokeWidth="20"
                />
                <path
                  d="M20 90 A 80 80 0 0 1 180 90"
                  fill="none"
                  stroke="#de2526"
                  strokeWidth="18"
                  strokeDasharray="251.2"
                  strokeDashoffset={251.2 - (speed / 100) * 251.2}
                  className="transition-all duration-300 ease-in-out"
                />
                <text
                  x="100"
                  y="60"
                  textAnchor="middle"
                  fill="black"
                  fontSize="24"
                  fontWeight="bold"
                >
                  {speed}
                </text>
                <text
                  x="100"
                  y="80"
                  textAnchor="middle"
                  fill="black"
                  fontSize="14"
                >
                  ERROR/H
                </text>
              </svg>
            </div>
          </div>

          <div className="text-center space-y-4">
            <p className="text-lg">
              La página que buscas se ha quedado sin combustible o ha tomado un
              desvío equivocado.
            </p>
            <Link
              href="/"
              className="flex w-fit mx-auto items-center bg-transparent hover:bg-redInka text-black hover:text-white font-headLight font-bold py-2 px-4 rounded-lg transition duration-300 border-2 border-black hover:border-redInka"
            >
              <Home className="w-5 h-5 mr-2" strokeWidth={2} />
              Volver a la pista principal
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
