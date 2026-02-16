import { Wallet, CreditCard, Smartphone, ShieldCheck } from "lucide-react";

const paymentMethods = [
  {
    name: "انستاباي",
    icon: Smartphone,
    details: "ادفع عبر الرابط",
    link: "https://ipn.eg/S/koky296/instapay/1u8CCB",
  },
  {
    name: "انستاباي - حساب بنكي",
    icon: CreditCard,
    details: "01006450767",
  },
  {
    name: "فودافون كاش",
    icon: Wallet,
    details: "01006450767",
  },
];

const PaymentMethods = () => {
  return (
    <section className="py-24 bg-white/5 relative overflow-hidden">
      <div className="premium-blur top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-primary/5" />

      <div className="container relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black text-white mb-4">
            طرق دفع آمنة وسهلة
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            اختر الوسيلة التي تناسبك. بعد التحويل، يرجى إرسال صورة إيصال الدفع عبر الواتساب لتفعيل حسابك فوراً.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {paymentMethods.map((method) => (
            <div
              key={method.name}
              className="group bg-card/40 backdrop-blur-md border border-white/5 rounded-3xl p-8 text-center hover:border-primary/50 transition-all duration-500 hover:-translate-y-2 shadow-xl shadow-black/20"
            >
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-500">
                <method.icon className="w-10 h-10 text-primary drop-shadow-[0_0_10px_rgba(var(--primary),0.5)]" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                {method.name}
              </h3>
              <div className="bg-black/20 rounded-xl py-3 px-4 mb-6 inline-block">
                <p className="text-primary font-black text-xl tracking-wider" dir="ltr">
                  {method.details}
                </p>
              </div>
              {method.link && (
                <a
                  href={method.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full bg-white/5 hover:bg-white/10 text-white font-bold py-3 rounded-xl transition-colors border border-white/10"
                >
                  ادفع الآن عبر الرابط
                </a>
              )}
            </div>
          ))}
        </div>

        <div className="mt-16 bg-primary/10 border border-primary/20 rounded-2xl p-6 max-w-3xl mx-auto flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center flex-shrink-0 animate-pulse">
            <ShieldCheck className="w-6 h-6 text-primary-foreground" />
          </div>
          <p className="text-sm md:text-base text-foreground font-medium">
            تنبيه أمني: تعامل فقط مع الأرقام المذكورة في موقعنا الرسمي. نحن غير مسؤولين عن أي تحويلات تتم لأرقام أخرى خارج هذه القائمة.
          </p>
        </div>
      </div>
    </section>
  );
};


export default PaymentMethods;
