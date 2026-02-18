import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Globe, X, Info } from "lucide-react";
import { useGeoLocation } from "@/hooks/useGeoLocation";

const PriceBubble = () => {
    const [isPopped, setIsPopped] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const { geoData } = useGeoLocation();

    useEffect(() => {
        const checkVisibility = () => {
            const lastPopTime = localStorage.getItem("price_bubble_last_pop");
            if (!lastPopTime) {
                setIsVisible(true);
                return;
            }

            const timePassed = Date.now() - parseInt(lastPopTime);
            if (timePassed > 60000) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
                // Set a timer to show it exactly when the minute is up
                const remaining = 60000 - timePassed;
                const timer = setTimeout(() => setIsVisible(true), remaining);
                return () => clearTimeout(timer);
            }
        };

        checkVisibility();
    }, []);

    const getGreeting = () => {
        if (!geoData) return "مرحباً بك في كارما استور 🚀";
        const code = geoData.country_code;
        const country = geoData.country_name;

        const praise: Record<string, string> = {
            "SA": "السعودية الحبيبة أهل الجود 🇸🇦",
            "AE": "الإمارات الحبيبة دار زايد 🇦🇪",
            "KW": "الكويت الغالية بلد الإنسانية 🇰🇼",
            "QA": "قطر الشقيقة QA",
            "BH": "البحرين الطبيبة 🇧🇭",
            "OM": "سلطنة عمان الأصلالة 🇴🇲",
            "EG": "مصر أم الدنيا بنحبكم يا أهلنا 🇪🇬",
            "LB": "لبنان الأرز والحب 🇱🇧",
            "JO": "الأردن النشامى 🇯🇴",
            "MA": "المغرب بلاد الأصالة 🇲🇦",
            "DZ": "الجزائر بلد الأحرار 🇩🇿",
            "PS": "فلسطين الأبية فخر العرب 🇵🇸"
        };
        return `مرحباً بك أخي من ${praise[code] || country} ❤️`;
    };

    const handlePop = () => {
        setIsPopped(true);
        localStorage.setItem("price_bubble_last_pop", Date.now().toString());

        setTimeout(() => {
            setIsVisible(false);
            // After 60s, it can re-appear
            setTimeout(() => {
                setIsPopped(false);
                setIsVisible(true);
            }, 60000);
        }, 600);
    };

    return (
        <div className="fixed bottom-32 right-4 md:right-10 z-[150] pointer-events-none">
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
                        <div className="w-12 h-12 md:w-20 md:h-20 bg-primary/20 backdrop-blur-md border-2 border-primary/50 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(var(--primary),0.3)] overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent pointer-events-none" />
                            <Globe className="w-6 h-6 md:w-10 md:h-10 text-primary animate-pulse" />

                            {/* Reflection line */}
                            <div className="absolute top-1.5 left-2.5 w-3 h-1.5 bg-white/40 rounded-full -rotate-45" />
                        </div>

                        {/* Content Tooltip - Expands UP on mobile, LEFT on desktop */}
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            className="absolute bottom-full mb-4 right-0 md:bottom-1/2 md:translate-y-1/2 md:right-full md:mr-4 bg-card/90 backdrop-blur-xl border border-white/10 p-3 rounded-2xl w-[70vw] md:w-64 shadow-2xl shadow-black z-[160]"
                        >
                            <div className="flex items-start gap-3">
                                <div className="mt-1 bg-primary/20 p-1.5 rounded-full">
                                    <Info className="w-4 h-4 text-primary" />
                                </div>
                                <div className="space-y-1" style={{ direction: 'rtl' }}>
                                    <p className="text-xs font-black text-white leading-tight">{getGreeting()}</p>
                                    <p className="text-[10px] text-muted-foreground leading-relaxed">تظهر لك الآن الأسعار والعروض المخصصة لدولتك. استمتع بمشاهدة غير محدودة!</p>
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
