import { motion } from "framer-motion";
import { MessageCircle, Star, ShieldCheck, Heart, Zap } from "lucide-react";

const ExpertRecommendation = () => {
    return (
        <section className="py-24 relative overflow-hidden">
            {/* Background Decorative Elements */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-primary/5 blur-[120px] rounded-full animate-pulse" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/5 blur-[120px] rounded-full animate-pulse delay-1000" />
            </div>

            <div className="container px-4 mx-auto relative z-10">
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="glass-effect p-8 md:p-12 rounded-[2.5rem] border border-primary/20 relative"
                    >
                        {/* Quote Icon */}
                        <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-primary p-4 rounded-2xl shadow-xl shadow-primary/20">
                            <Star className="w-8 h-8 text-black" />
                        </div>

                        <div className="text-center mt-6 space-y-6">
                            <h2 className="text-3xl md:text-5xl font-black text-white font-cairo leading-tight">
                                نحتار معك.. <span className="text-gradient">لنختار لك الأفضل!</span>
                            </h2>

                            <div className="space-y-6 text-lg md:text-xl leading-relaxed text-muted-foreground font-medium" style={{ direction: 'rtl' }}>
                                <p>
                                    نعلم أن اختيار الباقة المناسبة يعتمد كلياً على اهتماماتك الشخصية..
                                    سواء كنت تبحث عن استقرار رياضي فائق، أو مكتبة أفلام ضخمة، أو أعلى جودة بث ممكنة.
                                </p>

                                <div className="bg-primary/5 p-6 rounded-3xl border border-primary/10 my-8">
                                    <p className="text-white font-bold mb-4 flex items-center justify-center gap-2">
                                        <ShieldCheck className="w-6 h-6 text-primary" />
                                        نصيحة "كارما ستور" المخلصة لك:
                                    </p>
                                    <p className="text-white/90">
                                        إذا كنت تبحث عن راحة البال التامة وضمان الخدمة طوال فترة الاشتراك، فإن باقة <span className="text-primary font-black">ELITE Triple</span> أو <span className="text-primary font-black">VIP Bundle</span> هي اختيارك الذكي..
                                        صممنا هذه الباقات لنوفر لك <span className="text-white font-bold">سيرفرات وتطبيقات بديلة ومنوعة</span> تعمل معاً في نفس الوقت، مما يضمن لك أن "الخدمة لا تنقطع أبداً" مهما كانت الظروف.
                                    </p>
                                </div>

                                <p className="text-primary-foreground/80 italic font-bold text-center">
                                    "في باقات الـ VIP والـ ELITE، نحن لا نبيع مجرد اشتراك، بل نبيع التزاماً حقيقياً بالتشغيل المستمر ودعماً فنياً واقعياً يرافقك لحظة بلحظة."
                                </p>
                            </div>

                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="pt-8"
                            >
                                <a
                                    href="https://wa.me/201114417978"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-3 bg-primary text-primary-foreground px-10 py-5 rounded-full font-black text-xl shadow-2xl shadow-primary/30 hover:shadow-primary/50 transition-all"
                                >
                                    <MessageCircle className="w-6 h-6" />
                                    تحدث مع خبير الآن
                                </a>
                            </motion.div>
                        </div>

                        {/* Badges */}
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-12 pt-12 border-t border-white/5">
                            <div className="flex items-center justify-center gap-2 text-sm font-bold text-white/60">
                                <ShieldCheck className="w-5 h-5 text-primary" />
                                ضمان 100%
                            </div>
                            <div className="flex items-center justify-center gap-2 text-sm font-bold text-white/60">
                                <Star className="w-5 h-5 text-primary fill-primary" />
                                ترشيح الخبراء
                            </div>
                            <div className="hidden md:flex items-center justify-center gap-2 text-sm font-bold text-white/60 col-span-2 md:col-span-1">
                                <Zap className="w-5 h-5 text-primary" />
                                تفعيل فوري
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default ExpertRecommendation;
