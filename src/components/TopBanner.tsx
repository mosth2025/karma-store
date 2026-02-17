import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Timer, X } from "lucide-react";

const TopBanner = () => {
    const [isVisible, setIsVisible] = useState(true);
    const [messageIndex, setMessageIndex] = useState(0);
    const [timeLeft, setTimeLeft] = useState({
        hours: 3,
        minutes: 45,
        seconds: 0,
    });

    const messages = [
        "عرض محدود! خصم 20% على جميع باقات الـ VIP لـ 12 شهر",
        "📍 الأسعار داخل مصر - خارج مصر تواصل معنا للسعر وتفعيل الخدمة في دولتك"
    ];

    useEffect(() => {
        const messageTimer = setInterval(() => {
            setMessageIndex((prev) => (prev + 1) % messages.length);
        }, 5000);
        return () => clearInterval(messageTimer);
    }, []);

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
                if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
                if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
                return prev;
            });
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <AnimatePresence mode="wait">
            {isVisible && (
                <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="bg-gradient-to-r from-secondary via-primary to-secondary text-primary-foreground py-2 relative overflow-hidden"
                >
                    <div className="container mx-auto px-4 flex flex-col sm:flex-row items-center justify-center gap-4 text-xs md:text-sm font-bold text-center">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={messageIndex}
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: -20, opacity: 0 }}
                                transition={{ duration: 0.5 }}
                                className="flex items-center gap-2"
                            >
                                <span className="relative flex h-3 w-3">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
                                </span>
                                <span>{messages[messageIndex]}</span>
                            </motion.div>
                        </AnimatePresence>

                        {messageIndex === 0 && (
                            <div className="flex items-center gap-3 bg-black/20 px-4 py-1 rounded-full">
                                <Timer className="w-4 h-4" />
                                <div className="flex gap-1 font-mono">
                                    <span>{String(timeLeft.hours).padStart(2, '0')}</span>:
                                    <span>{String(timeLeft.minutes).padStart(2, '0')}</span>:
                                    <span>{String(timeLeft.seconds).padStart(2, '0')}</span>
                                </div>
                            </div>
                        )}

                        <button
                            onClick={() => setIsVisible(false)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 hover:rotate-90 transition-transform p-1 opacity-50 hover:opacity-100"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default TopBanner;
