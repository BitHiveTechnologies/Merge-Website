'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface SalesBannerProps {
    message?: string;
}

export default function SalesBanner({ message }: SalesBannerProps) {
    const defaultMessage = '!! EARLYBIRD SALE - Exclusive ₹500 OFF for the First 50 Students !!';

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

    return (
        <div
            className="fixed top-[70px] left-0 right-0 z-40 bg-gradient-to-r from-purple-800 to-pink-700 text-white py-1 md:py-2 px-2 md:px-4 text-center shadow-md"
            data-oid="v770x:e"
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
                    className="font-medium text-xs md:text-base"
                    data-oid="k51.8v6"
                >
                    {message || defaultMessage}
                </motion.span>
            </motion.div>
        </div>
    );
}
