import { motion } from "framer-motion";

const draw = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
        pathLength: 1,
        opacity: 1,
        transition: {
            pathLength: { type: "spring", duration: 1.5, bounce: 0 },
            opacity: { duration: 0.01 },
        },
    },
};

export const AnimatedXCircle = () => {
    return (
        <motion.svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial="hidden"
            animate="visible"
            className="min-h-[24px] min-w-[24px]"
        >
            <motion.path
                d="M0 0h24v24H0z"
                fill="none"
                stroke="none"
                variants={draw}
            />
            <motion.path
                d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"
                variants={draw}
            />
            <motion.path d="M10 10l4 4m0 -4l-4 4" variants={draw} />
        </motion.svg>
    );
};
