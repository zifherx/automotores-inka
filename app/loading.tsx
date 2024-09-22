"use client";

import CircleProgress from "@/components/Shared/CircleProgress/CircleProgress";
import { Car } from "lucide-react";

export default function LoadingPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="relative w-24 h-24 mb-8">
        <CircleProgress value={66} className="w-24 h-24" />

        <div className="absolute inset-0 flex items-center justify-center">
          <Car className="w-12 h-12 text-gray-600 animate-bounce" />
        </div>
      </div>

      <h1 className="text-2xl font-semibold text-gray-800 mb-2">Cargando</h1>

      <p className="text-gray-600">Preparando su experiencia automotriz</p>

      <div className="mt-8 flex space-x-2">
        <span className="w-3 h-3 bg-gray-400 rounded-full animate-pulse"></span>
        <span className="w-3 h-3 bg-gray-400 rounded-full animate-pulse delay-150"></span>
        <span className="w-3 h-3 bg-gray-400 rounded-full animate-pulse delay-300"></span>
      </div>
    </div>
  );
}
