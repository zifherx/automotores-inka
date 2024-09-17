"use client";
import { useEffect, useRef } from "react";
import { useAnimation, useInView, motion } from "framer-motion";
import { fadeIn } from "./RevealFade";

import { RevealProps } from "@/interfaces/iTransition";

export function RevealElement(props: RevealProps) {
  const { children, className, position, delay } = props;
  const ref = useRef(null);

  const isInView = useInView(ref, { once: false });
  const mainControls = useAnimation();
  const slideControls = useAnimation();

  useEffect(() => {
    if (isInView) {
      mainControls.start("visible");
      slideControls.start("visible");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInView]);

  return (
    <div ref={ref}>
      <motion.div
        variants={fadeIn(position, delay)}
        initial="hidden"
        animate={mainControls}
        exit="hidden"
        className={className}
      >
        {children}
      </motion.div>
    </div>
  );
}
