import { useState } from "react";
import Image from "next/image";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Title } from "@/components/Shared/Title";

import { iColores } from "@/types";
import { cn } from "@/lib";

export function Color(props: iColores) {
  const { colores } = props;

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
            <div
              className={cn(
                colores.length > 6
                  ? `grid grid-cols-6`
                  : `grid grid-cols-${colores.length}`,
                `gap-3 md:flex md:gap-2 mb-8`
              )}
            >
              {colores.map((color, index) => (
                <TooltipProvider key={index}>
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

            <div className="w-full max-w-5xl mx-auto">
              <Image
                src={selectedColor.carColor}
                alt={selectedColor.label}
                width={700}
                height={300}
                priority
                className="mx-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
