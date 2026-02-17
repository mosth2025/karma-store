import { motion } from "framer-motion";
import { Moon, Star } from "lucide-react";

const RamadanDecorations = () => {
    return (
        <div className="fixed inset-0 pointer-events-none z-[60] overflow-hidden">
            {/* Top Hanging Zina (Decorations) - Small on mobile */}
            <div className="absolute top-0 left-0 w-full flex justify-around items-start opacity-70">
                {[...Array(6)].map((_, i) => (
                    <motion.div
                        key={i}
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: i * 0.1, duration: 1 }}
                        className="flex flex-col items-center"
                    >
                        <div className="w-px h-12 md:h-24 bg-gradient-to-b from-transparent via-amber-500/40 to-amber-500" />
                        <motion.div
                            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                            transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                        >
                            <Star className="w-3 h-3 text-amber-400 fill-amber-300" />
                        </motion.div>
                    </motion.div>
                ))}
            </div>

            {/* Floating Minimalist Lantern - Bottom Left */}
            <motion.div
                drag
                dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                className="absolute bottom-10 left-6 md:bottom-20 md:left-20 pointer-events-auto cursor-grab active:cursor-grabbing"
                animate={{
                    y: [0, -15, 0],
                    rotate: [-5, 5, -5]
                }}
                transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            >
                <div className="flex flex-col items-center gap-2">
                    <div className="relative group">
                        {/* Glow Effect */}
                        <div className="absolute inset-0 bg-amber-500/20 blur-[20px] md:blur-[60px] rounded-full scale-150 animate-pulse" />

                        {/* Minimalist Lantern SVG */}
                        <svg
                            width="40" height="60" viewBox="0 0 40 60"
                            className="w-8 h-12 md:w-20 md:h-30 drop-shadow-[0_0_10px_rgba(251,191,36,0.5)]"
                        >
                            <path d="M10 15L20 5L30 15H10Z" fill="#B45309" stroke="#FBBF24" strokeWidth="1" />
                            <path d="M8 15H32L35 25L32 50H8L5 25L8 15Z" fill="url(#mini_fanous_gradient)" stroke="#FBBF24" strokeWidth="1.5" />
                            <path d="M12 50H28L30 58H10L12 50Z" fill="#B45309" stroke="#FBBF24" strokeWidth="1" />
                            <defs>
                                <linearGradient id="mini_fanous_gradient" x1="20" y1="15" x2="20" y2="50" gradientUnits="userSpaceOnUse">
                                    <stop stopColor="#FBBF24" />
                                    <stop offset="1" stopColor="#D97706" />
                                </linearGradient>
                            </defs>
                            <motion.circle
                                cx="20" cy="32" r="4" fill="white" opacity="0.8"
                                animate={{ opacity: [0.4, 1, 0.4], scale: [0.8, 1.2, 0.8] }}
                                transition={{ duration: 2, repeat: Infinity }}
                            />
                        </svg>
                    </div>

                    {/* Greeting Text - Hidden on mobile, shown on desktop */}
                    <div className="text-center whitespace-nowrap hidden md:block">
                        <motion.p
                            className="text-xl font-black text-amber-400 drop-shadow-[0_0_12px_rgba(251,191,36,0.9)] font-cairo"
                            style={{ direction: 'rtl' }}
                        >
                            كل عام وأنتم بخير <br />
                            <span className="text-base text-amber-200/90 italic">رمضان كريم</span>
                        </motion.p>
                    </div>
                </div>
            </motion.div>

            {/* Glowing Crescent Moon & Star - Top Right */}
            <motion.div
                className="absolute top-20 right-4 md:top-12 md:right-12 flex flex-col items-center gap-1 md:gap-4 scale-75 md:scale-100"
                animate={{
                    y: [0, -10, 0]
                }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            >
                <div className="relative">
                    <div className="absolute inset-0 bg-amber-200/20 blur-[20px] md:blur-[40px] rounded-full scale-150" />
                    <Moon className="w-8 h-8 md:w-24 md:h-24 text-amber-100 fill-amber-100/30 -rotate-12 drop-shadow-[0_0_10px_rgba(254,243,199,0.8)]" />
                </div>

                <div className="text-center">
                    <p className="text-[8px] md:text-2xl font-black text-amber-100 drop-shadow-[0_0_15px_rgba(255,255,255,0.5)] font-cairo uppercase" style={{ direction: 'rtl' }}>
                        رمضان كريم
                    </p>
                </div>
            </motion.div>

            {/* Gentle Light Particles - Hidden on mobile */}
            <div className="absolute inset-0 preserve-3d hidden md:block">
                {[...Array(15)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-amber-300 rounded-full"
                        initial={{
                            x: Math.random() * 1000,
                            y: Math.random() * 800,
                            opacity: 0
                        }}
                        animate={{
                            y: [null, Math.random() * -100],
                            opacity: [0, 0.5, 0],
                            scale: [0, 1.5, 0]
                        }}
                        transition={{
                            duration: Math.random() * 5 + 5,
                            repeat: Infinity,
                            delay: Math.random() * 10
                        }}
                    />
                ))}
            </div>
        </div>
    );
};

export default RamadanDecorations;
