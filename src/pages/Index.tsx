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
const Index = () => {
  const [showActivationSection, setShowActivationSection] = useState(false);
  const [showDownloadsSection, setShowDownloadsSection] = useState(false);

  const { geoData } = useGeoLocation();

  useEffect(() => {
    document.title = "كارما استور | أفضل سيرفرات IPTV في مصر والشرق الأوسط";

    // Update visibility of sections based on hash
    if (window.location.hash === "#activation") setShowActivationSection(true);
    if (window.location.hash === "#downloads") setShowDownloadsSection(true);
  }, []);

  const handleShowSection = (id: string) => {
    if (id === 'activation') setShowActivationSection(true);
    if (id === 'downloads') setShowDownloadsSection(true);

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
    </div>
  );
};

export default Index;
