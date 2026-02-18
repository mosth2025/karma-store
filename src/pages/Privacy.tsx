import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";

const Privacy = () => {
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
                        سياسة <span className="text-gradient">الخصوصية</span>
                    </h1>

                    <div className="space-y-8 text-muted-foreground text-lg leading-relaxed">
                        <section>
                            <h2 className="text-white text-xl font-bold mb-4">جمع المعلومات</h2>
                            <p>نقوم بجمع المعلومات اللازمة فقط لإتمام عملية الاشتراك، مثل الاسم (اختياري) ورقم الواتساب وعنوان البريد الإلكتروني.</p>
                        </section>

                        <section>
                            <h2 className="text-white text-xl font-bold mb-4">استخدام المعلومات</h2>
                            <p>تستخدم المعلومات للتواصل معك بخصوص اشتراكك، إرسال بيانات التفعيل، أو تنبيهك عند قرب انتهاء مدة الاشتراك.</p>
                        </section>

                        <section>
                            <h2 className="text-white text-xl font-bold mb-4">حماية البيانات</h2>
                            <p>نستخدم بروتوكولات حماية متطورة لضمان عدم وصول أي طرف غير مصرح له لبيانات المشتركين. خصوصيتك هي أولوية قصوى لنا.</p>
                        </section>

                        <section>
                            <h2 className="text-white text-xl font-bold mb-4">ملفات تعريف الارتباط (Cookies)</h2>
                            <p>نستخدم ملفات تعريف الارتباط لتحسين تجربة المستخدم على الموقع وتذكر تفضيلاتك الجغرافية لعرض الأسعار المناسبة لك.</p>
                        </section>
                    </div>
                </motion.div>
            </main>
            <Footer />
        </div>
    );
};

export default Privacy;
