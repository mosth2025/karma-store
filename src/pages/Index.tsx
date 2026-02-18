import { useEffect, useState, useRef } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import ServerCard from "@/components/ServerCard";
import Testimonials from "@/components/Testimonials";
import PaymentMethods from "@/components/PaymentMethods";
import Footer from "@/components/Footer";
import TopBanner from "@/components/TopBanner";
import StepByStep from "@/components/StepByStep";
import ExpertRecommendation from "@/components/ExpertRecommendation";
import DownloadCenter from "@/components/DownloadCenter";
import ScrollToTop from "@/components/ScrollToTop";
import IboSolActivation from "@/components/IboSolActivation";
import { motion, AnimatePresence } from "framer-motion";
import { useGeoLocation } from "@/hooks/useGeoLocation";
import { servers } from "@/data/prices";
import { Zap, Download } from "lucide-react";

const Index = () => {
  const [showActivationSection, setShowActivationSection] = useState(false);
  const [showDownloadsSection, setShowDownloadsSection] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [lastClickTime, setLastClickTime] = useState<Record<string, number>>({
    activation: 0,
    downloads: 0
  });

  const { geoData } = useGeoLocation();

  useEffect(() => {
    document.title = "كارما استور | أفضل سيرفرات IPTV في مصر والشرق الأوسط";

    // Update visibility of sections based on hash
    if (window.location.hash === "#activation") setShowActivationSection(true);
    if (window.location.hash === "#downloads") setShowDownloadsSection(true);

    const handleScroll = () => {
      // Header visibility
      setIsHeaderVisible(window.scrollY < 100);

      // Detect active section in view
      const sections = ['activation', 'downloads', 'servers'];
      let currentSection = null;
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            currentSection = section;
            break;
          }
        }
      }
      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleShowSection = (id: string) => {
    if (id === 'activation') setShowActivationSection(true);
    if (id === 'downloads') setShowDownloadsSection(true);

    setLastClickTime(prev => ({ ...prev, [id]: Date.now() }));

    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  const getPriceData = (server: any) => {
    const code = geoData?.country_code || "EG";
    const p = server.prices;

    if (code === "EG") return { price: p.EG, currency: "جنيه" };
    if (code === "SA") return { price: p.SA, currency: "ريال" };
    if (code === "AE") return { price: p.AE, currency: "درهم" };
    if (code === "JO") return { price: p.JO, currency: "دينار" };
    if (code === "KW") return { price: p.KW, currency: "دينار كويتي" };
    if (code === "QA") return { price: p.SA, currency: "ريال" };

    const europe = ["FR", "DE", "IT", "ES", "NL", "BE", "AT", "GR"];
    if (europe.includes(code)) return { price: p.US, currency: "€" };
    return { price: p.US, currency: "$" };
  };

  return (
    <div className="min-h-screen bg-background font-cairo overflow-x-hidden">
      <TopBanner />
      <Header onShowSection={handleShowSection} />
      <Hero />
      <Features />

      <AnimatePresence>
        {showActivationSection && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            transition={{ duration: 0.5 }}
          >
            <IboSolActivation />
          </motion.div>
        )}
      </AnimatePresence>

      <StepByStep />

      {/* Servers Section */}
      <section id="servers" className="py-12 md:py-24">
        <div className="container">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: -30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-3xl md:text-5xl font-bold text-foreground mb-6"
            >
              💥 السيرفرات المتاحة <span className="text-gradient">حالياً</span> 💥
            </motion.h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {servers.map((server, index) => {
              const { price, currency } = getPriceData(server);
              return (
                <ServerCard
                  key={server.name}
                  {...server}
                  price={price}
                  currency={currency}
                  index={index}
                />
              );
            })}
          </div>
        </div>
      </section>

      <ExpertRecommendation />
      <Testimonials />

      <AnimatePresence>
        {showDownloadsSection && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            transition={{ duration: 0.5 }}
          >
            <DownloadCenter />
          </motion.div>
        )}
      </AnimatePresence>

      <PaymentMethods />
      <Footer />
      <ScrollToTop />

      {/* Floating Action Buttons System */}
      <div className="fixed left-6 bottom-24 flex flex-col gap-3 z-[100] pointer-events-none">
        <AnimatePresence>
          {!isHeaderVisible && activeSection !== 'activation' && (Date.now() - (lastClickTime.activation || 0) > 60000) && (
            <motion.button
              initial={{ opacity: 0, x: -50, scale: 0.5 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -50, scale: 0.5 }}
              onClick={() => handleShowSection('activation')}
              className="pointer-events-auto w-10 h-10 md:w-12 md:h-12 bg-primary text-black rounded-full shadow-[0_0_20px_rgba(251,191,36,0.5)] flex items-center justify-center hover:scale-110 transition-transform group relative"
            >
              <Zap className="w-5 h-5 md:w-6 md:h-6" />
              <span className="absolute right-full mr-3 bg-black/80 text-white text-[10px] font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">تفعيل VIP</span>
            </motion.button>
          )}

          {!isHeaderVisible && activeSection !== 'downloads' && (Date.now() - (lastClickTime.downloads || 0) > 60000) && (
            <motion.button
              initial={{ opacity: 0, x: -50, scale: 0.5 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -50, scale: 0.5 }}
              onClick={() => handleShowSection('downloads')}
              className="pointer-events-auto w-10 h-10 md:w-12 md:h-12 bg-accent text-white rounded-full shadow-[0_0_20px_rgba(var(--accent),0.3)] flex items-center justify-center hover:scale-110 transition-transform group relative"
            >
              <Download className="w-5 h-5 md:w-6 md:h-6" />
              <span className="absolute right-full mr-3 bg-black/80 text-white text-[10px] font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">مركز التحميل</span>
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Index;
