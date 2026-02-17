import { useEffect, useState } from "react";
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
import { motion } from "framer-motion";
import { useGeoLocation } from "@/hooks/useGeoLocation";
import { servers } from "@/data/prices";

const Index = () => {
  const [showActivation, setShowActivation] = useState(true);
  const { geoData } = useGeoLocation();

  useEffect(() => {
    document.title = "كارما استور | أفضل سيرفرات IPTV في مصر والشرق الأوسط";

    // Fetch Settings
    fetch("http://localhost:3001/api/settings")
      .then(res => res.json())
      .then(data => setShowActivation(data.showActivation))
      .catch(err => console.error("Failed to fetch settings", err));

    // SEO Meta Tags Dynamic Update
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "اشترك الآن في كارما استور واستمتع بأقوى سيرفرات IPTV (نوفا، مارفل، هيدرا) بجودة 4K وبدون تقطيع. دعم فني 24 ساعة وأفضل الأسعار.");
    }

    // Scroll to section if hash exists in URL
    if (window.location.hash) {
      const id = window.location.hash.substring(1);
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 500); // Small delay to ensure components are rendered
      }
    }
  }, []);

  const getPriceData = (server: any) => {
    const code = geoData?.country_code || "EG";
    const p = server.prices;

    if (code === "EG") return { price: p.EG, currency: "جنيه" };
    if (code === "SA") return { price: p.SA, currency: "ريال" };
    if (code === "AE") return { price: p.AE, currency: "درهم" };
    if (code === "JO") return { price: p.JO, currency: "دينار" };
    if (code === "KW") return { price: p.KW, currency: "دينار كويتي" };
    if (code === "QA") return { price: p.SA, currency: "ريال" };

    // Europe
    const europe = ["FR", "DE", "IT", "ES", "NL", "BE", "AT", "GR"];
    if (europe.includes(code)) {
      return { price: p.US, currency: "€" };
    }

    // Default International
    return { price: p.US, currency: "$" };
  };

  return (
    <div className="min-h-screen bg-background font-cairo overflow-x-hidden">
      <TopBanner />
      <Header />
      <Hero />
      <Features />
      {showActivation && <IboSolActivation />}
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
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-muted-foreground text-lg max-w-2xl mx-auto"
            >
              اختر السيرفر المناسب لك واستمتع بمشاهدة غير محدودة لمدة سنة كاملة مع ضمان الاستقرار.
            </motion.p>
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
      <DownloadCenter />
      <PaymentMethods />
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Index;
