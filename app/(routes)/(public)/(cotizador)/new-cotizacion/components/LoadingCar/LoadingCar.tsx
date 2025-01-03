import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function LoadingCar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => (oldProgress + 1) % 101);
    }, 50);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const wheelVariants = {
    animate: {
      rotate: 360,
      transition: { duration: 2, repeat: Infinity, ease: "linear" },
    },
  };

  const textVariants = {
    animate: {
      opacity: [0, 1, 1, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        // repeatType: "loop",
        ease: "easeInOut",
      },
    },
  };

  const barVariants = {
    animate: {
      scaleX: [0, 1, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <div className="min-h-screen bg-gray-100/30 rounded-lg flex flex-col items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative w-48 h-48"
      >
        {/* Car body */}
        <motion.div
          className="absolute inset-0 bg-blue-500 rounded-t-full"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        />
        {/* Windshield */}
        <motion.div
          className="absolute top-1/4 left-1/4 right-1/4 bottom-1/2 bg-white rounded-t-full"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 0.3, delay: 0.5 }}
        />
        {/* Left wheel */}
        <motion.div
          className="absolute bottom-0 left-0 w-12 h-12 bg-gray-800 rounded-full border-4 border-gray-300"
          variants={wheelVariants}
          animate="animate"
        />
        {/* Right wheel */}
        <motion.div
          className="absolute bottom-0 right-0 w-12 h-12 bg-gray-800 rounded-full border-4 border-gray-300"
          variants={wheelVariants}
          animate="animate"
        />
      </motion.div>

      <div className="w-full max-w-[300px] h-2 bg-gray-200 rounded-full mt-8 overflow-hidden">
        <motion.div
          className="h-full bg-blue-500 rounded-full"
          variants={barVariants}
          animate="animate"
        />
      </div>

      <motion.p
        variants={textVariants}
        animate="animate"
        className="mt-4 text-xl font-semibold text-gray-700"
      >
        Cargando su modelo...
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="mt-8 text-center"
      >
        <p className="text-sm text-gray-500">Preparando:</p>
        <motion.ul className="mt-2 space-y-1">
          {["Marca", "Modelo", "Sede"].map((item, index) => (
            <motion.li
              key={item}
              variants={textVariants}
              animate="animate"
              style={{ animationDelay: `${index * 0.5}s` }}
              className="text-gray-600"
            >
              {item}
            </motion.li>
          ))}
        </motion.ul>
      </motion.div>
    </div>
  );
}
