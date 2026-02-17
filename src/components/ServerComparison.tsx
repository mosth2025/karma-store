import { motion } from "framer-motion";
import { Check, Info, Zap, Shield, Tv } from "lucide-react";

const comparisonData = [
    {
        feature: "جودة البث",
        captain: "FHD/HD",
        nova: "4K/FHD/HD",
        marvel: "4K/FHD/HD",
        hydra: "4K/FHD/HD",
    },
    {
        feature: "الثبات",
        captain: "جيد جداً",
        nova: "ممتاز",
        marvel: "فائق",
        hydra: "فائق",
    },
    {
        feature: "مكتبة الأفلام",
        captain: "متوسطة",
        nova: "ضخمة",
        marvel: "شاملة",
        hydra: "ضخمة",
    },
    {
        feature: "دعم الأجهزة",
        captain: "جهاز واحد",
        nova: "جهازين",
        marvel: "جهازين",
        hydra: "جهاز واحد",
    },
];

const ServerComparison = () => {
    return (
        <section className="py-20 bg-black/30">
            <div className="container px-4 mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">قارن بين <span className="text-gradient">السيرفرات</span></h2>
                    <p className="text-muted-foreground">جدول يوضح الفروقات الفنية لمساعدتك على اختيار الباقة الأنسب</p>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-right border-collapse">
                        <thead>
                            <tr className="bg-primary/10">
                                <th className="p-4 border border-white/10 text-primary">الميزة</th>
                                <th className="p-4 border border-white/10 text-white">كابتن</th>
                                <th className="p-4 border border-white/10 text-white">نوفا</th>
                                <th className="p-4 border border-white/10 text-white">مارفل</th>
                                <th className="p-4 border border-white/10 text-primary font-bold">هيدرا (الأقوى)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {comparisonData.map((row, index) => (
                                <tr key={index} className="hover:bg-white/5 transition-colors">
                                    <td className="p-4 border border-white/10 font-bold text-foreground/80">{row.feature}</td>
                                    <td className="p-4 border border-white/10 text-muted-foreground">{row.captain}</td>
                                    <td className="p-4 border border-white/10 text-muted-foreground">{row.nova}</td>
                                    <td className="p-4 border border-white/10 text-muted-foreground">{row.marvel}</td>
                                    <td className="p-4 border border-white/10 text-primary font-bold">{row.hydra}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
};

export default ServerComparison;
