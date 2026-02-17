import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

import { reportEvent } from "@/lib/reporter";

interface ServerCardProps {
  name: string;
  price: number | string;
  currency?: string;
  features: string[];
  popular?: boolean;
  index?: number;
}

const ServerCard = ({ name, price, currency = "جنيه", features, popular, index = 0 }: ServerCardProps) => {
  const handleOrder = () => {
    // Report event
    reportEvent({
      event: "order_click",
      details: `User clicked order for server: ${name} (Price: ${price} ${currency})`
    });

    const message = encodeURIComponent(
      `🚀 *طلب اشتراك وتفعيل - Karma Store*\n` +
      `----------------------------------\n` +
      `📌 *السيرفر:* ${name}\n` +
      `💰 *السعر:* ${price} ${currency} / سنة\n` +
      `📱 *نوع جهازي:* (أكتب هنا نوع جهازك: شاشة / أندرويد / آيفون)\n` +
      `----------------------------------\n` +
      `أرغب في تشغيل الباقة والتجربة أولاً، وسأقوم بالتحويل فور التأكد من التشغيل.`
    );
    window.open(`https://wa.me/201114417978?text=${message}`, "_blank", "noopener,noreferrer");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ scale: 1.02, y: -5 }}
      className={`relative rounded-2xl p-8 transition-all duration-500 overflow-hidden group ${popular
        ? "bg-gradient-to-b from-card to-card border-2 border-primary/50 shadow-[0_0_50px_rgba(var(--primary),0.15)]"
        : "bg-card/40 border border-border/50 hover:border-primary/30"
        }`}
    >
      {/* Background Decorative Gradient */}
      <div className={`absolute -top-24 -right-24 w-48 h-48 rounded-full blur-[80px] transition-opacity duration-500 group-hover:opacity-100 ${popular ? "bg-primary/20 opacity-100" : "bg-primary/10 opacity-0"
        }`} />

      {popular && (
        <motion.div
          initial={{ x: 100 }}
          animate={{ x: 0 }}
          className="absolute top-4 left-4 bg-gradient-to-r from-primary to-accent text-primary-foreground px-4 py-1 rounded-full text-xs font-black uppercase tracking-wider shadow-lg z-10"
        >
          الأكثر طلباً ⭐
        </motion.div>
      )}

      <div className="relative z-10">
        <h3 className="text-3xl font-black text-white mb-4 group-hover:text-primary transition-colors">{name}</h3>

        <div className="flex items-baseline gap-2 mb-8">
          <span className="text-5xl font-black text-primary drop-shadow-[0_0_10px_rgba(var(--primary),0.3)]">
            {price}
          </span>
          <span className="text-muted-foreground font-semibold">{currency} / سنة</span>
        </div>

        <ul className="space-y-4 mb-10">
          {features.map((feature, idx) => (
            <motion.li
              key={idx}
              className="flex items-center gap-3 text-foreground/90 font-medium"
            >
              <div className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              </div>
              {feature}
            </motion.li>
          ))}
        </ul>

        <Button
          onClick={handleOrder}
          className={`w-full gap-3 font-black text-lg py-7 rounded-xl transition-all duration-300 ${popular
            ? "bg-primary hover:bg-white text-primary-foreground hover:text-primary shadow-[0_10px_20px_rgba(var(--primary),0.2)]"
            : "bg-white/5 border border-white/10 hover:bg-primary hover:text-primary-foreground text-white"
            }`}
        >
          <MessageCircle className="w-6 h-6" />
          اشترك الآن
        </Button>
      </div>
    </motion.div>
  );
};


export default ServerCard;
