"use client";
import { motion } from "framer-motion";

export const EnterWrapper: React.FC<React.PropsWithChildren> = ({
    children,
}) => {
    return (
        <motion.div
            initial={{
                opacity: -1,
                transform: "translateY(-16px)",
            }}
            animate={{
                opacity: 1,
                transform: "translateY(0)",
                transition: {
                    delay: 0.1,
                    duration: 0.3,
                    ease: "easeOut",
                },
            }}
        >
            {children}
        </motion.div>
    );
};
