"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { LegalItemData } from "@/data";
import { motion } from "framer-motion";
import { Scale } from "lucide-react";
import Link from "next/link";
import { LegalItem } from "./LegalItem";

export function LegalInfo() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.8 }}
      className="mt-12"
    >
      <Card className="border-0 shadow-lg bg-gradient-to-r from-gray-50 to-slate-50">
        <CardContent className="p-8">
          <div className="flex items-center space-x-3 mb-6">
            <div className="bg-blue-100 p-2 rounded-full">
              <Scale className="h-6 w-6 text-blueInka" strokeWidth={2} />
            </div>
            <h3 className="text-xl font-bold text-gray-800">
              Marco Legal - Protección del Consumidor
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div className="space-y-4">
              {LegalItemData.slice(0, 3).map((item, index) => (
                <LegalItem key={index} legalProps={item} />
              ))}
            </div>

            <div className="space-y-4">
              {LegalItemData.slice(3, 6).map((item, index) => (
                <LegalItem key={index} legalProps={item} />
              ))}
            </div>
          </div>

          <Separator className="my-6" />

          <div className="text-center">
            <p className="text-sm text-gray-600">
              Para más información sobre tus derechos como consumidor, visita:{" "}
              <Link
                className="text-blue-600 font-medium"
                href={`https://www.indecopi.gob.pe`}
                target="_blank"
              >
                www.indecopi.gob.pe
              </Link>{" "}
              |{" "}
              <Link className="text-blue-600 font-medium" href={`tel:224-7777`}>
                Línea gratuita: 224-7777
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </motion.section>
  );
}
