import { Tv, Zap, Film } from "lucide-react";
import { motion } from "framer-motion";
import logo from "@/assets/karmastore-logo.webp";

const Hero = () => {
  return (
    <section className="pt-24 pb-16 md:pt-32 md:pb-24 bg-[var(--gradient-hero)] relative overflow-hidden">
      {/* Premium background decorative elements */}
      <div className="premium-blur top-[-10%] right-[-5%] w-[500px] h-[500px] bg-primary/20" />
      <div className="premium-blur bottom-[-10%] left-[-5%] w-[600px] h-[600px] bg-secondary/10" />

      <div className="container relative z-10">
        <div className="text-center max-w-5xl mx-auto">
          {/* Logo with Glow */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-10 flex justify-center"
          >
            <div className="relative group">
              <div className="absolute inset-0 bg-primary/25 blur-[100px] rounded-full scale-150 animate-pulse-slow" />
              <img
                src={logo}
                alt="Karma Store"
                className="relative h-36 md:h-52 object-contain drop-shadow-[0_0_50px_rgba(var(--primary),0.6)] animate-pulse-slow active:scale-95 transition-transform"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 bg-white/5 border border-white/10 backdrop-blur-md rounded-full px-5 py-2 mb-8"
          >
            <Zap className="w-4 h-4 text-primary animate-pulse" />
            <span className="text-primary text-sm font-bold tracking-wide">
              أقوى اشتراك IPTV في الشرق الأوسط
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-8 leading-[1.1]"
          >
            استمتع بعالم من
            <span className="text-gradient block mt-3">الترفيه اللامحدود</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed"
          >
            شاهد جميع القنوات الرياضية والعالمية، أحدث الأفلام والمسلسلات بجودة تصل إلى 4K دون تقطيع.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex flex-wrap items-center justify-center gap-8 text-foreground/80 font-medium"
          >
            <div className="flex items-center gap-3 bg-white/5 px-4 py-2 rounded-xl border border-white/5">
              <Tv className="w-6 h-6 text-primary" />
              <span>+10,000 قناة</span>
            </div>
            <div className="flex items-center gap-3 bg-white/5 px-4 py-2 rounded-xl border border-white/5">
              <Film className="w-6 h-6 text-primary" />
              <span>مكتبة ضخمة VOD</span>
            </div>
            <div className="flex items-center gap-3 bg-white/5 px-4 py-2 rounded-xl border border-white/5">
              <Zap className="w-6 h-6 text-primary" />
              <span>استقرار 99.9%</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};


export default Hero;
