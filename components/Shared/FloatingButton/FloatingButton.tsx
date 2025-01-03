"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"

const CarSteeringWheel = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-8 h-8"
    >
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="2" />
      <line x1="12" y1="2" x2="12" y2="4" />
      <line x1="12" y1="20" x2="12" y2="22" />
      <line x1="2" y1="12" x2="4" y2="12" />
      <line x1="20" y1="12" x2="22" y2="12" />
      <path d="M18 12 A6 6 0 0 1 12 18" />
      <path d="M6 12 A6 6 0 0 1 12 6" />
    </svg>
  )

export function FloatingButton() {
    const [isHovered, setIsHovered] = useState(false)
    const router = useRouter()

  return (
    <div className="fixed top-1/2 right-0 transform -translate-y-1/2 flex items-center overflow-hidden" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
        <motion.div className="flex items-center" initial={{x: "calc(100% - 64px)"}} animate={{x: isHovered ? 0 : "calc(100% - 64px)"}} transition={{type: "spring", stiffness: 300, damping: 30}}>
            <motion.button className="bg-blueInka text-white p-4 rounded-l-full shadow-lg z-10 flex-shrink-0 cursor-none">
                <motion.div animate={{rotate: isHovered ? -45 : 0}} transition={{type: "spring", stiffness: 260, damping: 20}}>
                    <CarSteeringWheel/>
                </motion.div>
            </motion.button>
            <div className="bg-blueInka text-white py-4 px-6 h-16 flex items-center shadow-lg">
                <motion.button className="whitespace-nowrap text-lg font-semibold cursor-pointer" onClick={() =>router.push('/cybermotor')} whileHover={{scale: 1.1}}>
                    Cybermotor
                </motion.button>
            </div>
        </motion.div>
    </div>
  )
}
