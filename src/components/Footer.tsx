import { Send, MessageCircle, ShieldCheck, Globe } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

const Footer = () => {
  return (
    <footer className="glass-effect border-t border-border/50 py-16 relative overflow-hidden">
      <div className="premium-blur bottom-[-20%] left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/10" />

      <div className="container relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div className="text-right">
            <h2 className="text-3xl font-black text-white mb-6">
              مستعد لتغيير تجربة مشاهدتك؟
            </h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-md">
              انضم لأكثر من 50,000 مشترك واستمتع بأفضل استقرار وجودة في الوطن العربي. دعم فني متاح لك 24 ساعة.
            </p>
            <div className="flex gap-4">
              <a
                href="https://wa.me/201114417978"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent("whatsapp_click", { location: "footer" })}
                className="flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3 rounded-full font-black hover:scale-105 transition-transform shadow-lg shadow-primary/20"
              >
                <MessageCircle className="w-5 h-5" />
                اشترك الآن
              </a>
              <a
                href="https://t.me/KARMASALES2"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent("telegram_click", { location: "footer" })}
                className="flex items-center gap-2 bg-white/5 border border-white/10 text-white px-8 py-3 rounded-full font-black hover:bg-white/10 transition-colors"
              >
                <Send className="w-5 h-5" />
                تليجرام
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-white/5 border border-white/5">
              <ShieldCheck className="w-10 h-10 text-primary mb-4" />
              <h4 className="text-white font-bold mb-2">ضمان الخدمة</h4>
              <p className="text-muted-foreground text-sm">نضمن لك استقرار البث طوال فترة الاشتراك.</p>
            </div>
            <div className="p-6 rounded-2xl bg-white/5 border border-white/5">
              <Globe className="w-10 h-10 text-primary mb-4" />
              <h4 className="text-white font-bold mb-2">تغطية عالمية</h4>
              <p className="text-muted-foreground text-sm">شاهد من أي مكان في العالم وبأي سرعة إنترنت.</p>
            </div>
          </div>
        </div>

        <div className="text-center text-muted-foreground text-sm border-t border-border/50 pt-10">
          <div className="flex flex-wrap justify-center gap-6 mb-6">
            <span className="flex items-center gap-2">⭐ أعلى تقييم عملاء</span>
            <span className="flex items-center gap-2">⚡ تفعيل فوري</span>
            <span className="flex items-center gap-2">🛡️ دفع آمن</span>
          </div>
          <div className="bg-black/20 p-6 rounded-2xl border border-white/5 mb-8 max-w-4xl mx-auto backdrop-blur-sm">
            <p className="mb-3 text-white/70 font-bold text-sm md:text-base leading-relaxed">
              📌 الأسعار المعروضة داخل مصر - للأسعار خارج مصر (بالدولار/اليورو) تواصل معنا عبر الواتساب.
            </p>
            <p className="text-primary/90 text-xs md:text-sm font-medium leading-relaxed">
              يتم تشغيل الخدمة داخل مصر فقط وغير متاح التعديل لذلك وجب التنبيه ..
              اذا كنت خارج مصر رجاء ابلاغ الدعم لتوضيح السعر حسب الدولة المطلوب الاشتراك فيها وتفعيل الخدمة خارج مصر ..
              شكراً لتفهمكم.
            </p>
          </div>
          <p>© 2026 <span className="text-primary font-black">Karma Store</span> - جميع الحقوق محفوظة</p>
        </div>
      </div>
    </footer>
  );
};


export default Footer;
