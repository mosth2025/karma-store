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

const servers = [
  {
    name: "VIP Bundle",
    price: 1200,
    features: ["12 شهر اشتراك", "سيرفرين (2) مختلفين", "جودة 4K فائقة", "دعم فني VIP"],
  },
  {
    name: "ELITE Triple",
    price: 1600,
    features: ["12 شهر اشتراك", "3 سيرفرات مختلفة", "أقصى استقرار ممكن", "أولوية التفعيل"],
    popular: true,
  },
  {
    name: "مارفل",
    price: 450,
    features: ["12 شهر اشتراك", "باقة مميزة", "دعم متعدد الأجهزة", "تحديث يومي"],
  },
  {
    name: "هيدرا",
    price: 450,
    features: ["12 شهر اشتراك", "أفضل استقرار", "جميع الرياضات", "مكتبة أفلام"],
  },
  {
    name: "نوفا",
    price: 400,
    features: ["12 شهر اشتراك", "استقرار عالي", "جميع الباقات", "دعم سريع"],
  },
  {
    name: "إكس",
    price: 425,
    features: ["12 شهر اشتراك", "جودة 4K", "قنوات رياضية", "VOD متاح"],
  },
  {
    name: "عرب ليونز",
    price: 700,
    features: ["12 شهر اشتراك", "باقة VIP", "جميع القنوات العالمية", "أولوية الدعم"],
  },
  {
    name: "MH",
    price: 350,
    features: ["12 شهر اشتراك", "جودة عالية HD", "قنوات متنوعة", "تحديث مستمر"],
  },
];

const Index = () => {
  const [showActivation, setShowActivation] = useState(true);

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

  return (
    <div className="min-h-screen bg-background font-cairo overflow-x-hidden">
      <TopBanner />
      <Header />
      <Hero />
      <Features />
      {showActivation && <IboSolActivation />}
      <StepByStep />

      {/* Servers Section */}
      <section id="servers" className="py-24">
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
            {servers.map((server, index) => (
              <ServerCard key={server.name} {...server} index={index} />
            ))}
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
