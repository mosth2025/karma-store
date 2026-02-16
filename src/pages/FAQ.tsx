import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Tv, Wifi, Settings, HelpCircle, Shield, Smartphone } from "lucide-react";

const faqCategories = [
  {
    title: "ما هو IPTV؟",
    icon: Tv,
    questions: [
      {
        q: "ما هي خدمة IPTV؟",
        a: "IPTV هو اختصار لـ Internet Protocol Television، وهي تقنية تتيح لك مشاهدة القنوات التلفزيونية والأفلام والمسلسلات عبر الإنترنت بدلاً من البث التقليدي أو الكابل."
      },
      {
        q: "ما الفرق بين IPTV والتلفزيون العادي؟",
        a: "IPTV يوفر لك محتوى متنوع وغير محدود من جميع أنحاء العالم، مع إمكانية المشاهدة في أي وقت وعلى أي جهاز، بينما التلفزيون العادي محدود بالقنوات المحلية ومواعيد البث."
      },
      {
        q: "هل IPTV قانوني؟",
        a: "نحن نوفر اشتراكات لخدمات IPTV شرعية ومرخصة. المسؤولية تقع على المستخدم في التأكد من قوانين بلده."
      }
    ]
  },
  {
    title: "المتطلبات التقنية",
    icon: Wifi,
    questions: [
      {
        q: "ما هي سرعة الإنترنت المطلوبة؟",
        a: "للحصول على تجربة مشاهدة سلسة:\n• جودة SD: 5 ميجابت/ثانية\n• جودة HD: 10 ميجابت/ثانية\n• جودة Full HD: 15 ميجابت/ثانية\n• جودة 4K: 25 ميجابت/ثانية أو أعلى"
      },
      {
        q: "ما هي الأجهزة المدعومة؟",
        a: "يمكنك المشاهدة على:\n• الهواتف الذكية (Android & iOS)\n• أجهزة التلفزيون الذكية (Smart TV)\n• أجهزة Android Box\n• Amazon Fire Stick\n• أجهزة الكمبيوتر والماك\n• أجهزة MAG"
      },
      {
        q: "هل أحتاج لتطبيق معين؟",
        a: "نعم، ستحتاج لتطبيق IPTV Player. سنرسل لك التطبيق المناسب لجهازك مع طريقة التثبيت بعد الاشتراك مباشرة."
      }
    ]
  },
  {
    title: "إعداد الخدمة",
    icon: Settings,
    questions: [
      {
        q: "كيف يتم تفعيل الاشتراك؟",
        a: "بعد إتمام الدفع وإرسال الإيصال عبر واتساب:\n1. نرسل لك بيانات الاشتراك خلال دقائق\n2. نوفر لك التطبيق المناسب\n3. نساعدك في التثبيت والإعداد مجاناً"
      },
      {
        q: "كم يستغرق التفعيل؟",
        a: "التفعيل فوري! بمجرد استلام إيصال الدفع، نقوم بإرسال بيانات الاشتراك خلال 5-15 دقيقة كحد أقصى."
      },
      {
        q: "هل يمكنني استخدام الاشتراك على أكثر من جهاز؟",
        a: "الاشتراك العادي يدعم جهاز واحد فقط. إذا كنت تريد استخدام أكثر من جهاز، تواصل معنا لمعرفة العروض المتاحة."
      }
    ]
  },
  {
    title: "حل المشكلات الشائعة",
    icon: HelpCircle,
    questions: [
      {
        q: "القنوات لا تعمل أو تتقطع",
        a: "جرب الخطوات التالية:\n1. تأكد من سرعة الإنترنت لديك\n2. أعد تشغيل التطبيق\n3. امسح ذاكرة التخزين المؤقت\n4. أعد تشغيل الراوتر\n5. إذا استمرت المشكلة، تواصل معنا"
      },
      {
        q: "ماذا أفعل إذا توقف البث فجأة؟",
        a: "هذا طبيعي أحياناً بسبب تحديثات السيرفر. انتظر بضع دقائق ثم حاول مرة أخرى. إذا استمرت المشكلة أكثر من ساعة، تواصل معنا."
      },
      {
        q: "الصورة ضبابية أو الجودة سيئة",
        a: "• تأكد من اختيار جودة البث المناسبة في إعدادات التطبيق\n• تحقق من سرعة الإنترنت\n• جرب الاتصال بشبكة 5GHz بدلاً من 2.4GHz"
      },
      {
        q: "التطبيق لا يفتح أو يتوقف",
        a: "• تأكد من تحديث التطبيق لآخر إصدار\n• امسح ذاكرة التخزين المؤقت\n• أعد تثبيت التطبيق\n• تأكد من توافق جهازك مع التطبيق"
      }
    ]
  },
  {
    title: "نصائح للمشاهدة المثالية",
    icon: Shield,
    questions: [
      {
        q: "كيف أحصل على أفضل تجربة مشاهدة؟",
        a: "• استخدم اتصال إنترنت سلكي (إيثرنت) إن أمكن\n• أغلق التطبيقات الأخرى التي تستهلك الإنترنت\n• استخدم VPN إذا كانت بعض القنوات محجوبة\n• حدّث التطبيق باستمرار"
      },
      {
        q: "هل يُنصح باستخدام VPN؟",
        a: "VPN قد يساعد في:\n• تحسين الاستقرار في بعض الدول\n• تجاوز حجب بعض المحتوى\nلكن قد يبطئ السرعة أحياناً. جربه واختر ما يناسبك."
      },
      {
        q: "متى يكون البث أفضل؟",
        a: "عادةً يكون البث أكثر استقراراً في أوقات الذروة المنخفضة (الصباح والظهر). في أوقات الذروة مثل المباريات الكبرى، قد يحدث ضغط على السيرفرات."
      }
    ]
  },
  {
    title: "الدعم والتواصل",
    icon: Smartphone,
    questions: [
      {
        q: "كيف أتواصل مع الدعم الفني؟",
        a: "يمكنك التواصل معنا عبر:\n• واتساب: 01114417978\n• تليجرام: @KARMASALES2\nنحن متاحون لمساعدتك في أي وقت!"
      },
      {
        q: "هل هناك ضمان أو استرجاع؟",
        a: "نوفر تجربة مجانية قبل الاشتراك للتأكد من جودة الخدمة. بعد التفعيل، لا يمكن استرجاع المبلغ لكننا نضمن لك دعماً فنياً مستمراً طوال فترة اشتراكك."
      },
      {
        q: "هل يمكنني تجربة الخدمة قبل الاشتراك؟",
        a: "نعم! تواصل معنا عبر واتساب واطلب تجربة مجانية لمدة محدودة للتأكد من جودة الخدمة قبل الاشتراك."
      }
    ]
  }
];

const FAQ = () => {
  useEffect(() => {
    document.title = "الأسئلة الشائعة - كارما استور";
  }, []);

  return (
    <div className="min-h-screen bg-background font-cairo">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-primary/10 to-background">
        <div className="container text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            الأسئلة الشائعة
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            كل ما تحتاج معرفته عن خدمة IPTV للحصول على أفضل تجربة مشاهدة
          </p>
        </div>
      </section>

      {/* FAQ Categories */}
      <section className="py-16">
        <div className="container max-w-4xl">
          {faqCategories.map((category, categoryIndex) => (
            <div key={category.title} className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <category.icon className="w-6 h-6 text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-foreground">
                  {category.title}
                </h2>
              </div>

              <Accordion type="single" collapsible className="space-y-3">
                {category.questions.map((item, index) => (
                  <AccordionItem
                    key={index}
                    value={`${categoryIndex}-${index}`}
                    className="bg-card border border-border rounded-xl px-6 data-[state=open]:border-primary/50"
                  >
                    <AccordionTrigger className="text-right hover:no-underline text-foreground font-medium">
                      {item.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground whitespace-pre-line leading-relaxed">
                      {item.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-card/50">
        <div className="container text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            لم تجد إجابة لسؤالك؟
          </h2>
          <p className="text-muted-foreground mb-6">
            تواصل معنا مباشرة وسنرد عليك في أقرب وقت
          </p>
          <a
            href="https://wa.me/201114417978"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3 rounded-full font-bold hover:bg-primary/90 transition-colors"
          >
            تواصل معنا عبر واتساب
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default FAQ;
