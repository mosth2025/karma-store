import { motion } from "framer-motion";
import { Moon, Star } from "lucide-react";

const RamadanDecorations = () => {
    return (
        <div className="fixed inset-0 pointer-events-none z-[60] overflow-hidden">
            {/* Top Hanging Zina (Decorations) */}
            <div className="absolute top-0 left-0 w-full flex justify-around items-start opacity-70">
                {[...Array(8)].map((_, i) => (
                    <motion.div
                        key={i}
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: i * 0.1, duration: 1 }}
                        className="flex flex-col items-center"
                    >
                        <div className="w-px h-16 md:h-24 bg-gradient-to-b from-transparent via-amber-500/40 to-amber-500" />
                        <motion.div
                            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                            transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                        >
                            <Star className="w-3 h-3 text-amber-400 fill-amber-300" />
                        </motion.div>
                    </motion.div>
                ))}
            </div>

            {/* Floating Premium Fanous - Bottom Left */}
            <motion.div
                drag
                dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                className="absolute bottom-10 left-4 md:bottom-20 md:left-20 pointer-events-auto cursor-grab active:cursor-grabbing block scale-[0.2] md:scale-100 origin-bottom-left"
                animate={{
                    y: [0, -20, 0],
                    rotate: [-3, 3, -3]
                }}
                transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            >
                <div className="flex flex-col items-center gap-4">
                    <div className="relative group">
                        {/* Intense Glow Effect */}
                        <div className="absolute inset-0 bg-amber-500/30 blur-[60px] rounded-full scale-150 animate-pulse" />

                        {/* SVG Fanous */}
                        <svg width="80" height="120" viewBox="0 0 80 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-[0_0_20px_rgba(251,191,36,0.7)]">
                            <circle cx="40" cy="10" r="4" stroke="#D97706" strokeWidth="2" />
                            <path d="M20 30L40 15L60 30H20Z" fill="#B45309" stroke="#FBBF24" strokeWidth="1.5" />
                            <path d="M15 30H65L70 45L65 90H15L10 45L15 30Z" fill="url(#fanous_gradient)" stroke="#FBBF24" strokeWidth="2" />
                            <rect x="35" y="40" width="10" height="40" rx="2" fill="#78350F" opacity="0.6" />
                            <path d="M25 45L30 80H20L15 45H25Z" fill="#78350F" opacity="0.4" />
                            <path d="M55 45L50 80H60L65 45H55Z" fill="#78350F" opacity="0.4" />
                            <path d="M20 90H60L65 105H15L20 90Z" fill="#B45309" stroke="#FBBF24" strokeWidth="1.5" />
                            <rect x="25" y="105" width="30" height="10" fill="#78350F" />
                            <defs>
                                <linearGradient id="fanous_gradient" x1="40" y1="30" x2="40" y2="90" gradientUnits="userSpaceOnUse">
                                    <stop stopColor="#FBBF24" />
                                    <stop offset="1" stopColor="#D97706" />
                                </linearGradient>
                            </defs>
                            <motion.circle
                                cx="40" cy="60" r="10" fill="white"
                                animate={{ opacity: [0.3, 0.9, 0.3], scale: [0.8, 1.3, 0.8] }}
                                transition={{ duration: 2, repeat: Infinity }}
                            />
                        </svg>
                    </div>

                    {/* Greeting Text - Positioned relatively to Fanous */}
                    <div className="text-center whitespace-nowrap">
                        <motion.p
                            className="text-2xl md:text-xl font-black text-amber-400 drop-shadow-[0_0_12px_rgba(251,191,36,0.9)] font-cairo"
                            style={{ direction: 'rtl' }}
                        >
                            كل عام وأنتم بخير <br />
                            <span className="text-xl md:text-base text-amber-200/90 italic">رمضان كريم</span>
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
                    <p className="text-[10px] md:text-2xl font-black text-amber-100 drop-shadow-[0_0_15px_rgba(255,255,255,0.5)] font-cairo uppercase" style={{ direction: 'rtl' }}>
                        رمضان كريم
                    </p>
                </div>
            </motion.div>

            {/* Gentle Light Particles */}
            <div className="absolute inset-0 preserve-3d">
                {[...Array(15)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-amber-300 rounded-full"
                        initial={{
                            x: Math.random() * window.innerWidth,
                            y: Math.random() * window.innerHeight,
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
