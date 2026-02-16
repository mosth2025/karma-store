import { motion } from "framer-motion";
import { ShoppingCart, CreditCard, PlayCircle, Rocket, MessageCircle } from "lucide-react";

const steps = [
    {
        title: "اطلب باقتك",
        description: "اختر السيرفر المناسب لك واضغط اشتراك لبدء المتابعة.",
        icon: <ShoppingCart className="w-8 h-8 text-primary" />,
    },
    {
        title: "التشغيل أولاً",
        description: "أخبر الدعم بنوع جهازك، وسنقوم بتشغيل الباقة لك فوراً.",
        icon: <PlayCircle className="w-8 h-8 text-primary" />,
    },
    {
        title: "تأكيد الدفع",
        description: "بعد الاطمئنان للتشغيل، يتم تأكيد الدفع خلال ساعتين بحد أقصى.",
        icon: <CreditCard className="w-8 h-8 text-primary" />,
    },
    {
        title: "استمتع بالمشاهدة",
        description: "مبروك! اشتراكك مفعل الآن مع ضمان كامل طوال فترة الاشتراك.",
        icon: <Rocket className="w-8 h-8 text-primary" />,
    },
];

const StepByStep = () => {
    return (
        <section className="py-24 relative">
            <div className="container px-4 mx-auto">
                <div className="text-center mb-20">
                    <h2 className="text-3xl md:text-5xl font-bold mb-6 font-cairo">كيف تشترك في <span className="text-gradient">كارما استور؟</span></h2>
                    <p className="text-muted-foreground text-lg">خطوات بسيطة وسهلة لتبدأ رحلتك الترفيهية معنا</p>
                </div>

                <div className="grid md:grid-cols-4 gap-8 relative">
                    {/* Connector Line (Desktop) */}
                    <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-primary/20 to-transparent -translate-y-12" />

                    {steps.map((step, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2 }}
                            className="relative z-10 text-center group"
                        >
                            <div className="w-20 h-20 mx-auto bg-card border border-white/10 rounded-3xl flex items-center justify-center mb-6 shadow-xl group-hover:border-primary/50 group-hover:shadow-primary/10 transition-all duration-500 transform group-hover:-translate-y-2">
                                {step.icon}
                                <div className="absolute -top-3 -right-3 w-8 h-8 bg-primary text-black font-bold rounded-full flex items-center justify-center">
                                    {index + 1}
                                </div>
                            </div>
                            <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                            <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default StepByStep;
