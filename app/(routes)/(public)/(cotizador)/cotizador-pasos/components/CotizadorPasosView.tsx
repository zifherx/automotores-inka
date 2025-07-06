"use client";

import { useState } from "react";
import { motion } from "framer-motion";

import { iBrand, iModelo, iSede } from "@/types";
import { stepsForm } from "@/data";
import { Progress } from "@/components/ui/progress";
import { StepContentSection } from "./StepContentSection";

export function CotizadorPasosView() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedBrand, setSelectedBrand] = useState<iBrand | null>(null);
  const [selectedModel, setSelectedModel] = useState<iModelo | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<iSede | null>(null);

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const progress = (currentStep / 4) * 100;

  return (
    <div className="min-h-screen bg-white py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-headBold text-blueInka mb-2">
            Encuentra tu Auto Ideal
          </h1>
          <p className="text-gray-800 font-headLight">
            Te ayudamos a encontrar el vehículo perfecto en simples pasos
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <div className="flex justify-between items-center mb-4">
            {stepsForm.map(({ description, id, title }) => (
              <div
                key={id}
                className={`flex items-center ${
                  id < stepsForm.length ? "flex-1" : ""
                }`}
              >
                <div className="flex flex-col items-center">
                  <div
                    className={`w-12 h-12 rounded-full text-xl flex items-center justify-center font-bold transition-colors ${
                      currentStep >= id
                        ? "bg-blueInka text-white"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {id}
                  </div>
                  <div className="text-center mt-2">
                    <p className="text-sm font-bold text-gray-800">{title}</p>
                    <p className="text-xs text-gray-800">{description}</p>
                  </div>
                </div>
                {id < stepsForm.length && (
                  <div className="flex-1 h-px bg-gray-400 -mt-5" />
                )}
              </div>
            ))}
          </div>
          <Progress value={progress} className="h-2" />
        </motion.div>

        <StepContentSection
          currentStep={currentStep}
          previous={prevStep}
          next={nextStep}
          selectedBrand={selectedBrand}
          setSelectedBrand={setSelectedBrand}
          selectedModel={selectedModel}
          setSelectedModel={setSelectedModel}
          selectedLocation={selectedLocation}
          setSelectedLocation={setSelectedLocation}
        />
      </div>
    </div>
  );
}
