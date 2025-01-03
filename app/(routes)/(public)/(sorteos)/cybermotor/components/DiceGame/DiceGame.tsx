"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import axios from "axios";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { iPremio } from "@/models/Concurso";
import { Play } from "lucide-react";
import { ConcursoDice } from "@/types";

interface Rotation {
  x: number;
  y: number;
  z: number;
}

export function DiceGame(props: ConcursoDice) {
  const { guardarRuedo, resultado, setResultado, premio, setPremio } = props;

  const [rolling, setRolling] = useState(false);
  const [result, setResult] = useState<number | null>(null);
  const [rotation, setRotation] = useState<Rotation>({ x: 0, y: 0, z: 0 });
  const [showResult, setShowResult] = useState(false);
  const [premios, setPremios] = useState<iPremio[]>([]);

  const getPremios = async () => {
    const query = await axios.get(`/api/concurso/by-name/Cybermotor`);
    if (query.status === 200) {
      setPremios(query.data.premios);
    }
  };

  useEffect(() => {
    getPremios();
  }, []);

  const rollDice = () => {
    setRolling(true);
    setShowResult(false);
    const newResult = Math.floor(Math.random() * 6) + 1;
    const rolls = 2 + Math.floor(Math.random() * 3); // 2 to 4 full rotations

    setRotation({
      x: 360 * rolls + getDiceRotation(newResult).x,
      y: 360 * rolls + getDiceRotation(newResult).y,
      z: Math.random() * 360,
    });

    setTimeout(() => {
      setResult(newResult);
      setRolling(false);
      // Mostrar el resultado después de que la animación haya terminado
      setResultado(result !== null ? result : 0);
      setPremio(result !== null ? premios[result - 1].name : "");

      setTimeout(() => {
        setShowResult(true);
        guardarRuedo();
      }, 500);
    }, 3000);
  };

  const getDiceRotation = (side: number): Rotation => {
    switch (side) {
      case 1:
        return { x: 0, y: 0, z: 0 };
      case 2:
        return { x: 0, y: -90, z: 0 };
      case 3:
        return { x: -90, y: 0, z: 0 };
      case 4:
        return { x: 90, y: 0, z: 0 };
      case 5:
        return { x: 0, y: 90, z: 0 };
      case 6:
        return { x: 180, y: 0, z: 0 };
      default:
        return { x: 0, y: 0, z: 0 };
    }
  };

  useEffect(() => {
    if (!rolling) {
      setRotation(
        result !== null ? getDiceRotation(result) : { x: 0, y: 0, z: 0 }
      );
    }
  }, [rolling, result]);

  return (
    <Card className="w-[400px] px-2 py-4 mx-auto bg-gradient-to-b from-[#00bcf6] to-[#0861b1] text-white">
      {/* <CardTitle className="text-center text-4xl font-bold">
        Juego de Dados
      </CardTitle> */}
      <CardDescription className="text-center text-xl font-semibold text-white">
        ¡Gire el dado para ganar!
      </CardDescription>
      <CardContent className="flex flex-col items-center gap-4">
        <div className="h-[200px] flex items-center justify-center">
          <motion.div
            className="dice"
            animate={{
              rotateX: rotation.x,
              rotateY: rotation.y,
              rotateZ: rotation.z,
            }}
            transition={{
              duration: 3,
              ease: [0.25, 0.1, 0.25, 0.1],
              type: "spring",
              stiffness: 100,
              damping: 15,
            }}
          >
            {[1, 2, 3, 4, 5, 6].map((side) => (
              <div key={side} className={`side side-${side}`}>
                {Array(side)
                  .fill(null)
                  .map((_, i) => (
                    <div key={i} className="dot"></div>
                  ))}
              </div>
            ))}
          </motion.div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-center gap-4">
        <Button
          onClick={rollDice}
          disabled={rolling}
          className="w-full bg-[#fee41c] text-white text-2xl transition-colors"
        >
          {rolling ? "Girando..." : "Lanzar Dado"}
          {!rolling && <Play className="w-5 h-5 ml-2" fill="#fff" />}
        </Button>
        <AnimatePresence>
          {showResult && result && !rolling && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center font-bold block"
            >
              {result === 1
                ? `Has sacado un ${result}. ${premios[result - 1].name}`
                : `¡Felicidades! Tu premio es: ${premios[result - 1].name}`}
              {/* : `¡Felicidades! Has sacado un ${result}. Tu premio es: ${premios[result - 1].name}`} */}
            </motion.p>
          )}
        </AnimatePresence>
      </CardFooter>
    </Card>
  );
}
