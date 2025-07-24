"use client";

import { AnimatePresence } from "framer-motion";

import { Card, CardContent } from "@/components/ui/card";

import { BrandSelection } from "./BrandSelection";
import { ModelSelection } from "./ModelSelection";
import { LocationSelection } from "./LocationSelection";
import { ContactForm } from "./ContactForm";

import { StepContentProp } from "@/types";

export function StepContentSection({
  currentStep,
  next,
  previous,
  selectedBrand,
  setSelectedBrand,
  selectedModel,
  setSelectedModel,
  selectedLocation,
  setSelectedLocation,
}: StepContentProp) {
  return (
    <Card className="shadow-md">
      <CardContent className="p-8">
        <AnimatePresence mode="wait">
          {currentStep === 1 && (
            <BrandSelection
              key="brand"
              onSelect={(brand) => {
                setSelectedBrand(brand);
                next();
              }}
            />
          )}
          {currentStep === 2 && (
            <ModelSelection
              key="model"
              selectedBrand={selectedBrand}
              onBack={previous}
              onSelect={(model) => {
                setSelectedModel(model);
                next();
              }}
            />
          )}
          {currentStep === 3 && (
            <LocationSelection
              key="location"
              selectedBrand={selectedBrand}
              onBack={previous}
              onSelect={(location) => {
                setSelectedLocation(location);
                next();
              }}
            />
          )}
          {currentStep === 4 && (
            <ContactForm
              key="contact"
              onBack={previous}
              selectedBrand={selectedBrand}
              selectedModel={selectedModel}
              selectedLocation={selectedLocation}
            />
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
}
