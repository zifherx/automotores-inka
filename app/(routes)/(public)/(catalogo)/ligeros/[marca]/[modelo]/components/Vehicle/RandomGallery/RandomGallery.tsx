/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useState, useEffect, FC } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

import { Title } from "@/components/Shared/Title";
import { iGallery } from "@/models";

interface RandomGalleryProps {
  images: iGallery[];
}

const RandomGallery: FC<RandomGalleryProps> = ({ images }) => {
  const [randomizedImages, setRandomizedImages] = useState<iGallery[]>([]);

  const getRandomSize = () => {
    const sizes = ["small", "medium", "large"];
    return sizes[Math.floor(Math.random() * sizes.length)];
  };

  const shuffleImages = () => {
    const shuffled = [...images]
      .sort(() => Math.random() - 0.5)
      .map((img) => ({ ...img, size: getRandomSize() }));
    setRandomizedImages(shuffled);
  };

  useEffect(() => {
    shuffleImages();
    const intervalId = setInterval(shuffleImages, 10000); // Rotate every 10 seconds
    return () => clearInterval(intervalId);
  }, [images]);

  return (
    <div className="container mx-auto px-4">
      <Title
        title="Galería"
        className="font-headRegular uppercase text-4xl text-center my-10"
      />

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        layout
      >
        <AnimatePresence>
          {randomizedImages.map((image) => (
            <motion.div
              key={image.id}
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.5 }}
              className={`relative overflow-hidden rounded-lg ${
                image.size === "small"
                  ? "h-48"
                  : image.size === "medium"
                  ? "h-64"
                  : "h-80"
              }`}
            >
              <Image
                src={image.imageUrl}
                alt={image.name}
                layout="fill"
                objectFit="cover"
                className="hover:scale-110 transition-transform duration-300 ease-in-out"
              />

              <motion.div
                className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.2 }}
              >
                <p className="text-sm font-semibold">{image.name}</p>
              </motion.div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default RandomGallery;
