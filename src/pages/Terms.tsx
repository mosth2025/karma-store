import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";

const Terms = () => {
    return (
        <div className="min-h-screen bg-background">
            <Header />
            <main className="container pt-32 pb-20">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-4xl mx-auto glass-effect p-8 md:p-12 rounded-[2rem] border border-white/10 text-right"
                >
                    <h1 className="text-3xl md:text-5xl font-black text-white mb-8 border-b border-primary/20 pb-6">
                        شروط <span className="text-gradient">الخدمة</span>
                    </h1>

                    <div className="space-y-8 text-muted-foreground text-lg leading-relaxed">
                        <section>
                            <h2 className="text-white text-xl font-bold mb-4">1. قبول الشروط</h2>
                            <p>باستخدامك لموقع كارما استور واشتراكك في خدماتنا، فإنك توافق على الالتزام بشروط الخدمة هذه. خدماتنا مخصصة للاستخدام الشخصي فقط.</p>
                        </section>

                        <section>
                            <h2 className="text-white text-xl font-bold mb-4">2. طبيعة الخدمة</h2>
                            <p>كارما استور هو وسيط لتقديم خدمات البث عبر الإنترنت (IPTV). نحن نسعى جاهدين لضمان أعلى مستويات الاستقرار، ولكن الطبيعة التقنية لشبكة الإنترنت قد تؤدي أحياناً لانقطاعات خارجة عن إرادتنا.</p>
                        </section>

                        <section>
                            <h2 className="text-white text-xl font-bold mb-4">3. سياسة التفعيل والدفع</h2>
                            <p>يتم تفعيل الاشتراك فور تأكيد عملية الدفع. بيانات الاشتراك يتم إرسالها للعميل عبر وسائل التواصل المحددة (غالباً واتساب). يرجى التأكد من دقة البيانات المدخلة.</p>
                        </section>

                        <section>
                            <h2 className="text-white text-xl font-bold mb-4">4. الخصوصية</h2>
                            <p>نحن نحترم خصوصيتك تماماً. لا يتم استخدام بياناتك إلا لغرض تفعيل الاشتراك فقط، ولا يتم مشاركتها مع أي طرف ثالث.</p>
                        </section>

                        <section>
                            <h2 className="text-white text-xl font-bold mb-4">5. إخلاء المسؤولية</h2>
                            <p>كارما استور غير مسؤول عن أي محتوى يتم بثه عبر السيرفرات، الخدمة مقدمة كما هي، والعميل مسؤول عن استخدامه للخدمة وفقاً للقوانين المحلية لديه.</p>
                        </section>
                    </div>
                </motion.div>
            </main>
            <Footer />
        </div>
    );
};

export default Terms;
