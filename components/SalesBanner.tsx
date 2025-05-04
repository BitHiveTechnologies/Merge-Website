'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface SalesBannerProps {
    message?: string;
}

export default function SalesBanner({ message }: SalesBannerProps) {
    const [isVisible, setIsVisible] = useState(true);
    const defaultMessage = 'EARLYBIRD SALE - Exclusive ₹500 OFF for the First 50 Students';

    // Animation variants for text
    const textVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
            },
        },
    };

    const pulseVariants = {
        pulse: {
            scale: [1, 1.05, 1],
            color: ['#ffffff', '#ffd700', '#ffffff'],
            transition: {
                duration: 2,
                repeat: Infinity,
            },
        },
    };

    if (!isVisible) return null;

    return (
        <div
            className="bg-gradient-to-r from-purple-800 to-pink-700 text-white py-2 px-4 text-center relative"
            data-oid="z8cglj3"
        >
            <motion.div
                initial="hidden"
                animate="visible"
                variants={textVariants}
                className="flex items-center justify-center"
                data-oid="h9onw:c"
            >
                <motion.span
                    animate="pulse"
                    variants={pulseVariants}
                    className="font-medium"
                    data-oid="k51.8v6"
                >
                    {message || defaultMessage}
                </motion.span>
            </motion.div>
        </div>
    );
}
