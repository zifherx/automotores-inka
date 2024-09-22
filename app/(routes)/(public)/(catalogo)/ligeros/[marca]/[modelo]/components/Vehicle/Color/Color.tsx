import { useState } from "react";
import { useSearchParams } from "next/navigation";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Title } from "@/components/Shared/Title";

import { iColores } from "@/types";

export function Color(props: iColores) {
  const { colores } = props;

  const router = useSearchParams();

  const [selectedColor, setSelectedColor] = useState(colores[0]);

  return (
    <div className="max-w-6xl mx-auto">
      <div className="pt-24 px-2 md:px-10">
        <Title
          title="Elige el color que va contigo"
          className="font-headRegular uppercase text-2xl md:text-4xl font-bold text-center"
        />
        <div className="mt-10">
          <div className="flex flex-col items-center">
            <div className="flex space-x-4 mb-8">
              {colores.map((color) => (
                <TooltipProvider key={color.label}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button
                        className={`w-10 h-10 rounded-full border-2 ${
                          selectedColor.label === color.label
                            ? "border border-[#E7E7E7]"
                            : "border-8 border-[##E7E7E7]"
                        }`}
                        style={{ backgroundColor: color.hex }}
                        onClick={() => setSelectedColor(color)}
                      />
                    </TooltipTrigger>
                    <TooltipContent side="bottom">
                      <p className="text-lg font-textRegular">{color.label}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ))}
            </div>

            <div className="w-full max-w-5xl">
              <img
                src={selectedColor.carColor}
                className="mx-auto object-cover"
                alt={selectedColor.label}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
