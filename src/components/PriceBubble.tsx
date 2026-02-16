import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Globe, X, Info } from "lucide-react";

const PriceBubble = () => {
    const [isPopped, setIsPopped] = useState(false);
    const [isVisible, setIsVisible] = useState(true);

    const handlePop = () => {
        setIsPopped(true);
        // After popping, hide the UI completely for a bit, then reset
        setTimeout(() => {
            setIsVisible(false);
            setTimeout(() => {
                setIsPopped(false);
                setIsVisible(true);
            }, 5000); // Re-appear after 5 seconds
        }, 600); // Duration of the "pop" animation
    };

    return (
        <div className="fixed bottom-36 right-4 md:right-10 z-[150] pointer-events-none">
            <AnimatePresence>
                {isVisible && !isPopped && (
                    <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{
                            scale: [1, 1.5, 0],
                            opacity: [1, 0.8, 0],
                            transition: { duration: 0.4 }
                        }}
                        whileHover={{ scale: 1.1 }}
                        className="pointer-events-auto cursor-pointer relative group"
                        onClick={handlePop}
                    >
                        {/* The Bubble Shell */}
                        <div className="w-16 h-16 md:w-20 md:h-20 bg-primary/20 backdrop-blur-md border-2 border-primary/50 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(var(--primary),0.3)] overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent pointer-events-none" />
                            <Globe className="w-8 h-8 md:w-10 md:h-10 text-primary animate-pulse" />

                            {/* Reflection line */}
                            <div className="absolute top-2 left-4 w-4 h-2 bg-white/40 rounded-full -rotate-45" />
                        </div>

                        {/* Content Tooltip - Expands UP on mobile, LEFT on desktop */}
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            className="absolute bottom-full mb-4 right-0 md:bottom-1/2 md:translate-y-1/2 md:right-full md:mr-4 bg-card/90 backdrop-blur-xl border border-white/10 p-4 rounded-2xl w-[85vw] md:w-64 shadow-2xl shadow-black z-[160]"
                        >
                            <div className="flex items-start gap-3">
                                <div className="mt-1 bg-primary/20 p-1.5 rounded-full">
                                    <Info className="w-4 h-4 text-primary" />
                                </div>
                                <div className="space-y-1" style={{ direction: 'rtl' }}>
                                    <p className="text-xs font-black text-white leading-tight">📍 الأسعار داخل مصر فقط</p>
                                    <p className="text-[10px] text-muted-foreground leading-relaxed">إذا كنت خارج مصر، يرجى إبلاغ الدعم لتوضيح السعر وتفعيل الخدمة في دولتك.</p>
                                    <p className="text-[9px] text-primary/80 font-bold mt-2 animate-bounce flex items-center gap-1 justify-end">
                                        اضغط لتفجير الفقاعة 💥
                                    </p>
                                </div>
                            </div>
                            {/* Tooltip Corner - Hidden on mobile, shown on desktop */}
                            <div className="hidden md:block absolute bottom-1/2 translate-y-1/2 -right-2 w-4 h-4 bg-card/90 border-r border-b border-white/10 rotate-[225deg]" />
                        </motion.div>

                        {/* Ripple Effect around bubble */}
                        <div className="absolute inset-0 rounded-full border-2 border-primary/30 animate-ping opacity-20" />
                    </motion.div>
                )}

                {isPopped && (
                    <motion.div
                        className="absolute inset-0 flex items-center justify-center pointer-events-none"
                        initial={{ opacity: 1 }}
                        animate={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        {/* Simple Explosion Particles */}
                        {[...Array(8)].map((_, i) => (
                            <motion.div
                                key={i}
                                className="absolute w-2 h-2 bg-primary rounded-full"
                                animate={{
                                    x: Math.cos(i * 45) * 60,
                                    y: Math.sin(i * 45) * 60,
                                    scale: 0,
                                    opacity: 0
                                }}
                                transition={{ duration: 0.5 }}
                            />
                        ))}
                        <span className="text-2xl">💥</span>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default PriceBubble;
