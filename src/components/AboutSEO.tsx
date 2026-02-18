import { motion } from "framer-motion";
import { ShieldCheck, Users, Zap, Globe, Mail, Phone, MapPin } from "lucide-react";

const AboutSEO = () => {
    return (
        <section id="about" className="py-20 relative overflow-hidden bg-white/5">
            <div className="container relative z-10">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="text-right"
                    >
                        <h2 className="text-3xl md:text-5xl font-black text-white mb-8">
                            حول <span className="text-gradient">كارما استور</span>
                        </h2>
                        <div className="space-y-6 text-muted-foreground text-lg leading-relaxed">
                            <p>
                                بدأت رحلة <strong>كارما استور (Karma Store)</strong> منذ أكثر من 5 سنوات بهدف واحد: تقديم تجربة بث تلفزيوني لا تشوبها شائبة لمستخدمينا حول العالم. نحن لسنا مجرد مزود خدمة، بل نحن شركاؤك في ترفيه منزلي بلا حدود.
                            </p>
                            <p>
                                نتميز بتوفير أقوى سيرفرات الـ <strong>IPTV</strong> العالمية التي تضمن لك مشاهدة أكثر من 10,000 قناة بجودة 4K و Ultra HD، مع مكتبة أفلام ومسلسلات (VOD) يتم تحديثها يومياً لتشمل أحدث الإصدارات الحصرية.
                            </p>
                            <p>
                                في كارما استور، نؤمن بأن الجودة هي أساس الاستمرارية، لذا نستخدم أحدث تقنيات الضغط والبث لضمان عمل الخدمة حتى مع سرعات الإنترنت الضعيفة، مع استقرار بنسبة 99.9% طوال العام.
                            </p>

                            <div className="bg-white/5 p-6 rounded-2xl border border-white/10 mt-10">
                                <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                                    <Mail className="w-5 h-5 text-primary" />
                                    معلومات التواصل الرسمية
                                </h3>
                                <ul className="space-y-3 text-sm">
                                    <li className="flex items-center gap-3">
                                        <Phone className="w-4 h-4 text-primary" />
                                        <span>واتساب: <a href="https://wa.me/201114417978" target="_blank" className="text-white hover:underline">+20 111 441 7978</a></span>
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <Mail className="w-4 h-4 text-primary" />
                                        <span>البريد الإلكتروني: <a href="mailto:support@karmastore.site" className="text-white hover:underline">support@karmastore.site</a></span>
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <MapPin className="w-4 h-4 text-primary" />
                                        <span>المقر: خدمة سحابية عالمية (Online Global Service)</span>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-6 mt-12">
                            <div className="flex flex-col items-center p-4 rounded-2xl bg-white/5 border border-white/5">
                                <span className="text-3xl font-black text-primary mb-1">+50k</span>
                                <span className="text-xs text-white/60">عميل سعيد</span>
                            </div>
                            <div className="flex flex-col items-center p-4 rounded-2xl bg-white/5 border border-white/5">
                                <span className="text-3xl font-black text-primary mb-1">24/7</span>
                                <span className="text-xs text-white/60">دعم فني</span>
                            </div>
                        </div>
                    </motion.div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm group hover:border-primary/30 transition-colors"
                        >
                            <ShieldCheck className="w-12 h-12 text-primary mb-6 group-hover:scale-110 transition-transform" />
                            <h3 className="text-xl font-bold text-white mb-3">حماية وخصوصية</h3>
                            <p className="text-sm text-muted-foreground">بيانتك واشتراكك في أمان تام مع تشفير كامل لعمليات الدفع والتفعيل.</p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm group hover:border-primary/30 transition-colors"
                        >
                            <Zap className="w-12 h-12 text-primary mb-6 group-hover:scale-110 transition-transform" />
                            <h3 className="text-xl font-bold text-white mb-3">تفعيل فورى</h3>
                            <p className="text-sm text-muted-foreground">بمجرد إتمام الطلب، يتم إرسال بيانات التفعيل لك فوراً عبر الواتساب.</p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                            className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm group hover:border-primary/30 transition-colors"
                        >
                            <Users className="w-12 h-12 text-primary mb-6 group-hover:scale-110 transition-transform" />
                            <h3 className="text-xl font-bold text-white mb-3">دعم فني متخصص</h3>
                            <p className="text-sm text-muted-foreground">فريقنا معك خطوة بخطوة من بداية التفعيل وحتى تشغيل الخدمة على جهازك.</p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4 }}
                            className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm group hover:border-primary/30 transition-colors"
                        >
                            <Globe className="w-12 h-12 text-primary mb-6 group-hover:scale-110 transition-transform" />
                            <h3 className="text-xl font-bold text-white mb-3">سيرفرات عالمية</h3>
                            <p className="text-sm text-muted-foreground">نضم أقوى السيرفرات العالمية (Nova, Marvel, Hydra) لضمان التنوع والاستقرار.</p>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutSEO;
