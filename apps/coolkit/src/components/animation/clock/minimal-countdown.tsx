"use client"

import { useState, useEffect } from "react"
import { motion } from "motion/react"

interface MinimalCountdownProps {
    initialSeconds?: number
    onComplete?: () => void
    size?: number // New prop to define custom size
}

export default function MinimalCountdown({
    initialSeconds = 60,
    onComplete,
    size = 256, // Default size (e.g., 256px diameter)
}: MinimalCountdownProps) {
    const [timeLeft, setTimeLeft] = useState(initialSeconds)
    const [isActive, setIsActive] = useState(true)

    useEffect(() => {
        if (timeLeft === 0) {
            onComplete?.()
            return
        }

        const timer = setInterval(() => {
            setTimeLeft((prev) => prev - 1)
        }, 1000)

        return () => clearInterval(timer)
    }, [timeLeft, onComplete])

    const seconds = timeLeft
    const progress = (timeLeft / initialSeconds) * 100

    const strokeWidth = size * 0.02 // Stroke thickness relative to size

    return (
        <div className="relative flex flex-col items-center justify-center" style={{ width: size, height: size }}>
            {/* Main Container */}
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="relative"
                style={{ width: size, height: size }}
            >
                {/* Outer Ring */}
                <div className="relative" style={{ width: size, height: size }}>
                    <svg
                        className="w-full h-full -rotate-90"
                        viewBox="0 0 100 100"
                        style={{ width: size, height: size }}
                    >
                        {/* Background track */}
                        <circle
                            cx="50"
                            cy="50"
                            r="45"
                            className="fill-none stroke-gray-200"
                            style={{ strokeWidth: strokeWidth * 1.5 }}
                        />
                        {/* Progress track */}
                        <motion.circle
                            cx="50"
                            cy="50"
                            r="45"
                            className="fill-none stroke-primary"
                            strokeLinecap="round"
                            strokeDasharray={`${progress * 2.83} 283`}
                            style={{ strokeWidth: strokeWidth * 1.5 }}
                            initial={{ pathLength: 1 }}
                            animate={{ pathLength: progress / 100 }}
                            transition={{ duration: 1, ease: "linear" }}
                        />
                    </svg>

                    {/* Center Content */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <motion.div
                            className="text-center"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setIsActive(!isActive)}
                        >
                            <div className={` font-mono tracking-tight`}
                                style={{ fontSize: size * 0.3 }}
                            >
                                <span className="tabular-nums">
                                    {seconds.toString().padStart(2, "0")}
                                </span>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}
