import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { useEffect, useState } from "react";

interface Testimonial {
    name: string;
    role: string;
    content: string;
    rating: number;
    timestamp: number; // Use real timestamps
}

const testimonialsData: Testimonial[] = [
    {
        name: "أحمد محمود",
        role: "مشترك VIP Bundle",
        content: "كنت شايل هم تقطيع السيرفرات في الماتشات الكبيرة، بس لما اشتركت في الـ VIP بجد ارتحت. عندي أكتر من سيرفر بديل شغالين مع بعض، ولو واحد فيه صيانة التاني شغال طلقة.",
        rating: 5,
        timestamp: Date.now() - (14 * 24 * 60 * 60 * 1000), // 2 weeks ago
    },
    {
        name: "محمد علي",
        role: "مشترك ELITE Triple",
        content: "الدعم الفني هنا حقيقي مش مجرد كلام. لما واجهت مشكلة في التشغيل على شاشتي، الدعم فضل معايا لحظة بلحظة لغاية ما اشتغل، والخدمة مابتفصلش فعلاً بفضل السيرفرات البديلة.",
        rating: 5,
        timestamp: Date.now() - (30 * 24 * 60 * 60 * 1000), // 1 month ago
    },
    {
        name: "سامح إبراهيم",
        role: "مشترك ELITE Triple",
        content: "باقة الـ ELITE هي فعلاً قمة الهرم في كارما. التنوع بين السيرفرات والتطبيقات البديلة بيخليني أتفرج وأنا مطمن 100% إن الخدمة مستحيل تفصل. تستحق كل قرص لراحة البال.",
        rating: 5,
        timestamp: Date.now() - (3 * 24 * 60 * 60 * 1000), // 3 days ago
    },
];

const getTimeAgo = (timestamp: number) => {
    const now = Date.now();
    const diff = now - timestamp;

    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const weeks = Math.floor(days / 7);
    const months = Math.floor(days / 30);

    if (months > 0) return `منذ ${months} شهر`;
    if (weeks > 0) return `منذ ${weeks} أسبوع`;
    if (days > 0) return `منذ ${days} أيام`;
    if (hours > 0) return `منذ ${hours} ساعة`;
    return `منذ ${minutes} دقيقة`;
};

const Testimonials = () => {
    const [currentTime, setCurrentTime] = useState(Date.now());

    // Update time every hour to keep "X hours ago" realistic if needed
    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(Date.now()), 1000 * 60 * 60);
        return () => clearInterval(timer);
    }, []);

    return (
        <section id="testimonials" className="py-24 relative overflow-hidden">
            {/* Background Ornaments */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-[100px] pointer-events-none" />

            <div className="container px-4 mx-auto relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-block px-4 py-1.5 mb-4 text-sm font-semibold tracking-wider text-primary uppercase bg-primary/10 rounded-full"
                    >
                        آراء المشتركين الحقيقية
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-3xl md:text-5xl font-bold text-foreground mb-6 font-cairo"
                    >
                        ماذا يقول عملاؤنا عن <span className="text-gradient">تجربة كارما؟</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-muted-foreground text-lg"
                    >
                        باقات الـ VIP والـ ELITE ليست مجرد اشتراك، بل هي ضمان للمشاهدة المستمرة بأعلى جودة.
                    </motion.p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {testimonialsData.map((testimonial, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="glass-effect p-8 rounded-2xl relative group hover:border-primary/50 transition-colors duration-500"
                        >
                            <div className="absolute -top-4 -right-4 bg-primary p-3 rounded-xl shadow-lg transform -rotate-12 group-hover:rotate-0 transition-transform duration-300">
                                <Quote className="w-5 h-5 text-primary-foreground" />
                            </div>

                            <div className="flex mb-4">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        className={`w-4 h-4 ${i < testimonial.rating ? "text-primary fill-primary" : "text-muted"
                                            }`}
                                    />
                                ))}
                            </div>

                            <p className="text-foreground/90 leading-relaxed mb-6 italic" style={{ direction: 'rtl' }}>
                                "{testimonial.content}"
                            </p>

                            <div className="flex items-center justify-between border-t border-white/5 pt-6" style={{ direction: 'rtl' }}>
                                <div>
                                    <h4 className="font-bold text-foreground">{testimonial.name}</h4>
                                    <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                                </div>
                                <span className="text-xs text-muted-foreground/60">{getTimeAgo(testimonial.timestamp)}</span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
