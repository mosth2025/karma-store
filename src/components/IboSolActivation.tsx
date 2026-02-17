import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Info, ShieldCheck, Zap, Laptop, Tv, Smartphone, MessageCircle, Camera, User, Phone, Loader2, Image as ImageIcon, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { useGeoLocation } from "@/hooks/useGeoLocation";
import { reportEvent } from "@/lib/reporter";

const APP_CATEGORIES = [
    {
        name: "IBO Suite & VPN",
        apps: [
            { id: "ibopro", name: "IBOPLAYER + IBOAPPS", color: "from-red-600/10", img: "/apps-icons/ibopro.png" },
            { id: "hushplay", name: "HUSHPLAY", color: "from-green-500/10", img: "/apps-icons/ibo_special.png" },
            { id: "ibovpn", name: "IBO VPN PLAYER", color: "from-red-600/10", img: "/apps-icons/ibovpn.png" },
            { id: "ibosolplayer", name: "IBOSOLPlayer", color: "from-emerald-500/10", img: "/apps-icons/ibosolplayer.png" },
            { id: "smartersvpn", name: "SMARTERS VPN PLAYER", color: "from-blue-500/10", img: "/apps-icons/smartersvpn.png" },
        ]
    },
    {
        name: "Sports Legends",
        apps: [
            { id: "cr7", name: "CR7 PLAYER", color: "from-yellow-600/10", img: "/apps-icons/cr7.png" },
            { id: "messi", name: "MESSI PLAYER", color: "from-blue-600/10", img: "/apps-icons/messi.png" },
        ]
    },
    {
        name: "Premium Players",
        apps: [
            { id: "bobplayer", name: "BOBPLAYER", color: "from-blue-500/10", img: "/apps-icons/bobplayer.png" },
            { id: "bobpro", name: "BOBPRO", color: "from-red-600/10", img: "/apps-icons/bobpro.png" },
            { id: "bobpremium", name: "BOBPREMIUM", color: "from-green-400/10", img: "/apps-icons/bobpremium.png" },
            { id: "king4kplayer", name: "KING4KPLAYER", color: "from-amber-600/10", img: "/apps-icons/bob_special.png" },
            { id: "duplex", name: "DUPLEX", color: "from-cyan-500/10", img: "/apps-icons/duplex.png" },
            { id: "flixnet", name: "FLIXNET", color: "from-green-600/10", img: "/apps-icons/flixnet.png" },
            { id: "smartone", name: "SMARTONE PRO", color: "from-blue-900/10", img: "/apps-icons/smartone.png" },
            { id: "smartoneiptv", name: "SMARTONE IPTV", color: "from-blue-600/10", img: "/apps-icons/smartoneiptv.webp" },
        ]
    },
    {
        name: "Classic Players",
        apps: [
            { id: "abeplayer", name: "ABEPlayerTV", color: "from-yellow-400/10", img: "/apps-icons/abeplayer.png" },
            { id: "macplayer", name: "MACPLAYER", color: "from-red-500/10", img: "/apps-icons/macplayer.png" },
            { id: "virginia", name: "VIRGINIA", color: "from-purple-500/10", img: "/apps-icons/virginia.png" },
            { id: "allplayer", name: "AllPlayer", color: "from-orange-500/10", img: "/apps-icons/allplayer.png" },
            { id: "ktnplayer", name: "KTNPLAYER", color: "from-blue-400/10", img: "/apps-icons/ktnplayer.png" },
            { id: "familyplayer", name: "FAMILYPLAYER", color: "from-red-600/10", img: "/apps-icons/familyplayer.png" },
            { id: "ibossplayer", name: "IBOSSPLAYER", color: "from-rose-500/10", img: "/apps-icons/ibossplayer.png" },
            { id: "ibostb", name: "IBOSTB", color: "from-blue-800/10", img: "/apps-icons/ibostb.png" },
            { id: "iboxxplayer", name: "IBOXX IPTV", color: "from-orange-600/10", img: "/apps-icons/iboxxplayer.png" },
            { id: "ora", name: "ORA PLAYER", color: "from-purple-600/10", img: "/apps-icons/ora.png" },
            { id: "smarters", name: "SMARTERS PLAYER", color: "from-sky-500/10", img: "/apps-icons/smarters.png" },
            { id: "hotplayer", name: "HOT PLAYER", color: "from-orange-600/10", img: "/apps-icons/hotplayer.svg" },
        ]
    }
];

const AppIcon = ({ src, alt, isSelected }: { src: string, alt: string, isSelected: boolean }) => {
    const [imgSrc, setImgSrc] = useState(src);
    return (
        <img
            src={imgSrc}
            alt={alt}
            className={`w-full h-full object-contain p-2 transition-all duration-300 ${isSelected ? "brightness-125 scale-110" : "opacity-80 grayscale-[20%]"}`}
            onError={() => {
                if (imgSrc.endsWith('.webp')) {
                    setImgSrc(imgSrc.replace('.webp', '.png'));
                } else if (imgSrc.endsWith('.png')) {
                    setImgSrc(imgSrc.replace('.png', '.svg'));
                }
            }}
        />
    );
};

const IboSolActivation = () => {
    const [selectedApps, setSelectedApps] = useState<string[]>([]);
    const [isLifetime, setIsLifetime] = useState(false);
    const [macAddress, setMacAddress] = useState("");
    const [uploadSite, setUploadSite] = useState("");
    const [isScanning, setIsScanning] = useState(false);
    const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isActivating, setIsActivating] = useState(false);
    const { toast } = useToast();
    const { geoData } = useGeoLocation();

    const getPriceData = () => {
        const code = geoData?.country_code || "EG";

        let annual = 150;
        let lifetime = 300;
        let currency = "جنيه";

        if (code !== "EG") {
            // International Defaults (Equivalent to 200/350 EGP)
            annual = 15;
            lifetime = 25;
            currency = "$";

            if (code === "SA") { currency = "ريال"; annual = 60; lifetime = 100; }
            if (code === "AE") { currency = "درهم"; annual = 60; lifetime = 100; }
            if (code === "JO") { currency = "دينار"; annual = 12; lifetime = 18; }
            if (code === "KW") { currency = "دينار كويتي"; annual = 5; lifetime = 8; }
            if (code === "QA") { currency = "ريال"; annual = 60; lifetime = 100; }
        }

        return {
            price: isLifetime ? lifetime : annual,
            currency
        };
    };

    const { price: currentPrice, currency: currentCurrency } = getPriceData();

    const toggleApp = (appId: string) => {
        if (selectedApps.includes(appId)) {
            setSelectedApps(selectedApps.filter((id) => id !== appId));
        } else {
            if (selectedApps.length >= 4) {
                toast({
                    title: "عفواً! تجاوزت الحد الأقصى",
                    description: "يمكنك اختيار حتى 4 تطبيقات فقط في العرض الواحد.",
                    variant: "destructive",
                });
                return;
            }
            setSelectedApps([...selectedApps, appId]);
        }
    };

    const handleImageScan = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setIsScanning(true);
        toast({
            title: "جاري تحليل الصورة... 🔍",
            description: "ثواني وبنستخرج الماك أدريس بالذكاء الاصطناعي.",
        });

        try {
            const Tesseract = (await import('tesseract.js')).default;
            const { data: { text } } = await Tesseract.recognize(file, 'eng');

            console.log("OCR Raw Text:", text);

            // 1. Extract Site/URL (More Robust)
            const textLower = text.toLowerCase().replace(/\s/g, ''); // Remove spaces for better matching

            if (textLower.includes("smarterspro") || textLower.includes("smtspro")) {
                setUploadSite("smartersproplayer.net");
            } else if (textLower.includes("iboplayer") || textLower.includes("ibopro")) {
                setUploadSite("iboplayer.com");
            } else if (textLower.includes("bobplayer") || textLower.includes("bobpro")) {
                setUploadSite("bobplayer.com");
            } else if (textLower.includes("smartone")) {
                setUploadSite("smartone-iptv.com");
            } else {
                const urlRegex = /(?:https?:\/\/)?(?:www\.)?([a-zA-Z0-9-]+\.[a-zA-Z]{2,}(?:\/\S*)?)/gi;
                const urlMatch = text.match(urlRegex);
                if (urlMatch && urlMatch.length > 0) {
                    const domainMatch = urlMatch[0].replace(/https?:\/\/|www\./gi, '').split('/')[0];
                    if (domainMatch.includes('.') && domainMatch.length > 5) {
                        setUploadSite(domainMatch);
                    }
                }
            }

            // 2. Extract MAC preserving case
            const strictRegex = /([0-9a-fA-F]{2}[:-]){5}([0-9a-fA-F]{2})/g;
            const strictMatches = text.match(strictRegex);

            if (strictMatches && strictMatches.length > 0) {
                setMacAddress(strictMatches[0]);
                toast({
                    title: "✅ تم استخراج الماك!",
                    description: `الماك: ${strictMatches[0]} ${urlMatch ? "\nالموقع: " + urlMatch[0] : ""}`,
                });
            } else {
                // Strategy 2: Smart cleaning for misreads (Only if strict fails)
                const upperText = text.toUpperCase();
                const cleaned = upperText
                    .replace(/O/g, '0')
                    .replace(/S/g, '5')
                    .replace(/I/g, '1')
                    .replace(/[^A-F0-9]/g, '');

                const smartMatch = cleaned.match(/[0-9A-F]{12}/);

                if (smartMatch) {
                    const formattedMac = smartMatch[0].match(/.{1,2}/g)?.join(':') || smartMatch[0];
                    setMacAddress(formattedMac);
                    toast({
                        title: "✅ تم التوثيق بالذكاء الاصطناعي",
                        description: `تم العثور على الماك وتصحيحه: ${formattedMac}`,
                    });
                } else {
                    toast({
                        title: "❌ لم نجد كود الماك",
                        description: "برجاء التأكد من وضوح الصورة أو كتابة الماك يدوياً.",
                        variant: "destructive",
                    });
                }
            }
        } catch (error) {
            console.error("Scan error:", error);
            toast({
                title: "خطأ في التحميل",
                description: "تأكد من اتصال الإنترنت وحاول مرة أخرى.",
                variant: "destructive",
            });
        } finally {
            setIsScanning(false);
        }
    };

    const handleActivation = async () => {
        if (!macAddress || macAddress.length < 12) {
            toast({
                title: "بيانات ناقصة",
                description: "برجاء التأكد من كتابة الماك أدريس بشكل صحيح.",
                variant: "destructive",
            });
            return;
        }

        if (selectedApps.length === 0) {
            toast({
                title: "لم تختر تطبيقات",
                description: "برجاء اختيار تطبيق واحد على الأقل للتفعيل.",
                variant: "destructive",
            });
            return;
        }

        setIsActivating(true);

        // Preparation for WhatsApp
        const appsNames = selectedApps.map(id => {
            // Flatten categories to find the app
            for (const cat of APP_CATEGORIES) {
                const app = cat.apps.find(a => a.id === id);
                if (app) return app.name;
            }
            return id;
        }).join(", ");

        const duration = isLifetime ? "مدى الحياة" : "سنة واحدة";
        const finalPrice = `${currentPrice} ${currentCurrency}`;

        // Report event
        reportEvent({
            event: "activation_request",
            details: `User requested VIP activation for MAC: ${macAddress}, Site: ${uploadSite || 'None'}, Apps: ${appsNames}, Duration: ${duration} (Price: ${finalPrice})`
        });

        const message = encodeURIComponent(
            `🚀 *طلب تفعيل VIP جديد - Karma Store*\n` +
            `----------------------------------\n` +
            `🆔 *الماك أدريس:* \`${macAddress}\` \n` +
            (uploadSite ? `🌐 *رابط الرفع:* ${uploadSite}\n` : "🌐 *موقع الرفع:* (لم يتم التعرف عليه)\n") +
            `📌 *التطبيقات:* ${appsNames}\n` +
            `⏳ *المدة:* ${duration}\n` +
            `💰 *السعر:* ${finalPrice}\n` +
            `----------------------------------\n` +
            `لقد قمت باختيار التطبيقات ومراجعة البيانات، برجاء التفعيل فوراً.`
        );

        toast({
            title: "جاري إرسال الطلب للمدير... 🚀",
            description: "سيتم فتح الواتساب الآن لإتمام التفعيل فوراً.",
        });

        setTimeout(() => {
            window.open(`https://wa.me/201114417978?text=${message}`, "_blank", "noopener,noreferrer");
            setIsActivating(false);
        }, 1500);
    };

    return (
        <section id="activation" className="py-24 relative overflow-hidden bg-background">
            <div className="premium-blur top-[-10%] left-[-10%] w-[600px] h-[600px] bg-primary/10" />
            <div className="premium-blur bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-accent/5" />

            <div className="container relative z-10">
                <div className="text-center mb-16 px-4">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-6 py-2 mb-6"
                    >
                        <ShieldCheck className="w-5 h-5 text-primary animate-pulse" />
                        <span className="text-primary font-bold text-sm tracking-widest uppercase">Verified IboSol Panel Connection</span>
                    </motion.div>

                    <h2 className="text-4xl md:text-6xl font-black text-white mb-6">
                        تفعيل <span className="text-gradient">VIP</span> فوري
                    </h2>
                    <p className="text-muted-foreground text-lg max-w-3xl mx-auto leading-relaxed">
                        اختر تطبيقاتك المفضلة وسيقوم فريقنا بتفعيلها لك فوراً بأفضل استقرار وثبات عبر لوحتنا الرسمية.
                    </p>
                </div>

                <div className="max-w-6xl mx-auto grid lg:grid-cols-[1fr_400px] gap-8 px-4">
                    <div className="space-y-8">
                        <div className="flex items-center justify-between">
                            <h3 className="text-xl md:text-2xl font-bold text-white flex items-center gap-3">
                                <Tv className="text-primary w-6 h-6" />
                                اختر التطبيقات <span className="text-sm font-normal text-muted-foreground">(بحد أقصى 4)</span>
                            </h3>
                            <div className="bg-white/5 px-4 py-1 rounded-full border border-white/10">
                                <span className="text-primary font-bold">{selectedApps.length}</span> / 4
                            </div>
                        </div>

                        <div className="space-y-12">
                            {APP_CATEGORIES.map((category) => (
                                <div key={category.name} className="space-y-4">
                                    <h4 className="text-[11px] font-bold text-white/40 uppercase tracking-[0.2em] px-2 flex items-center gap-4">
                                        <span className="whitespace-nowrap">{category.name}</span>
                                        <div className="h-px bg-white/10 w-full"></div>
                                    </h4>
                                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                        {category.apps.map((app) => (
                                            <motion.div
                                                key={app.id}
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                onClick={() => toggleApp(app.id)}
                                                className={`relative cursor-pointer group rounded-2xl p-3 h-36 flex flex-col items-center justify-center text-center transition-all duration-500 border ${selectedApps.includes(app.id)
                                                    ? "bg-gradient-to-br " + app.color + " border-primary shadow-[0_0_25px_rgba(var(--primary),0.15)]"
                                                    : "bg-white/5 border-white/5 hover:border-white/20 hover:bg-white/[0.07]"
                                                    }`}
                                            >
                                                <div className={`w-20 h-20 rounded-2xl mb-3 flex items-center justify-center overflow-hidden border border-white/20 ${app.name.toLowerCase().includes('smarters') || app.name.toLowerCase().includes('hot player')
                                                    ? "bg-slate-900"
                                                    : "bg-gray-100"
                                                    } ${selectedApps.includes(app.id) ? "scale-110 shadow-lg" : ""}`}>
                                                    <AppIcon
                                                        src={app.img}
                                                        alt={app.name}
                                                        isSelected={selectedApps.includes(app.id)}
                                                    />
                                                </div>
                                                <span className={`text-[11px] font-bold tracking-tight uppercase leading-tight mt-1 transition-all duration-500 ${selectedApps.includes(app.id)
                                                    ? "text-amber-100 drop-shadow-[0_0_10px_rgba(255,215,0,0.9)] scale-105"
                                                    : "text-white/60 group-hover:text-amber-300 group-hover:drop-shadow-[0_0_8px_rgba(255,191,0,0.6)]"
                                                    }`}>
                                                    {app.name}
                                                </span>

                                                {selectedApps.includes(app.id) && (
                                                    <motion.div
                                                        layoutId="selection-ring"
                                                        className="absolute inset-0 border-2 border-primary rounded-2xl pointer-events-none z-20"
                                                    />
                                                )}

                                                {selectedApps.includes(app.id) && (
                                                    <div className="absolute top-2 right-2 bg-primary rounded-full p-1 z-30 shadow-lg">
                                                        <Check className="w-3 h-3 text-black font-bold" />
                                                    </div>
                                                )}
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="bg-card/60 backdrop-blur-xl border border-border/50 rounded-3xl p-6 md:p-8 sticky top-24 shadow-2xl shadow-black/50 overflow-hidden">
                            <div className="relative z-10 space-y-8">
                                <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                                    <div className="flex items-center justify-between mb-4">
                                        <Label htmlFor="duration" className="text-base font-bold text-white">المدة المطلوبة</Label>
                                        <span className={`px-2 py-1 rounded-full text-[10px] font-bold ${isLifetime ? "bg-accent/20 text-accent" : "bg-primary/20 text-primary"}`}>
                                            {isLifetime ? "مدى الحياة" : "سنوي"}
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-center gap-4">
                                        <span className={`text-xs ${!isLifetime ? "text-primary font-bold" : "text-muted-foreground"}`}>سنة واحدة</span>
                                        <Switch
                                            id="duration"
                                            checked={isLifetime}
                                            onCheckedChange={setIsLifetime}
                                        />
                                        <span className={`text-xs ${isLifetime ? "text-primary font-bold" : "text-muted-foreground"}`}>مدى الحياة</span>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <div className="flex items-center justify-between mb-1">
                                        <Label className="text-base font-bold text-white flex items-center gap-2">
                                            <Smartphone className="w-4 h-4 text-primary" />
                                            MAC Address
                                        </Label>
                                        <button
                                            onClick={() => fileInputRef.current?.click()}
                                            disabled={isScanning}
                                            className="text-[10px] font-bold text-primary flex items-center gap-1 bg-primary/10 px-2 py-1 rounded-full hover:bg-primary/20 transition-all"
                                        >
                                            {isScanning ? <Loader2 className="w-3 h-3 animate-spin" /> : <Camera className="w-3 h-3" />}
                                            تصوير الماك
                                        </button>
                                        <input
                                            type="file"
                                            ref={fileInputRef}
                                            onChange={handleImageScan}
                                            accept="image/*"
                                            className="hidden"
                                        />
                                    </div>
                                    <div className="relative">
                                        <Input
                                            placeholder="00:11:22:33:44:55"
                                            value={macAddress}
                                            onChange={(e) => setMacAddress(e.target.value)}
                                            className={`bg-black/20 border-white/10 h-14 text-center text-xl font-mono tracking-widest focus:border-primary/50 transition-all ${isScanning ? "opacity-50" : ""}`}
                                            maxLength={17}
                                        />
                                        {isScanning && (
                                            <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-xl backdrop-blur-[2px]">
                                                <div className="flex items-center gap-2 text-primary font-bold text-xs">
                                                    <Loader2 className="w-4 h-4 animate-spin" />
                                                    جاري استخراج الماك...
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    <AnimatePresence>
                                        {uploadSite && (
                                            <motion.div
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: "auto" }}
                                                exit={{ opacity: 0, height: 0 }}
                                                className="space-y-2"
                                            >
                                                <Label className="text-[10px] font-bold text-white/40 uppercase tracking-widest px-1 flex items-center gap-2">
                                                    <Globe className="w-3 h-3 text-primary" />
                                                    موقع الرفع المكتشف
                                                </Label>
                                                <Input
                                                    value={uploadSite}
                                                    onChange={(e) => setUploadSite(e.target.value)}
                                                    className="bg-black/20 border-white/5 h-10 text-center text-xs text-primary font-bold"
                                                />
                                            </motion.div>
                                        )}
                                    </AnimatePresence>

                                    <p className="text-[10px] text-muted-foreground flex items-center gap-2">
                                        <Info className="w-3 h-3 text-primary" />
                                        يمكنك كتابة الماك يدوياً أو تصوير الشاشة
                                    </p>
                                </div>

                                <div className="border-t border-white/10 pt-6 space-y-4">
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-muted-foreground">التكلفة الإجمالية:</span>
                                        <span className="font-black text-white">{isLifetime ? "2" : "1"} نقطة</span>
                                    </div>
                                    <div className="flex justify-between items-center text-primary">
                                        <span className="font-bold text-sm">السعر:</span>
                                        <span className="text-xl font-black">{currentPrice} {currentCurrency}</span>
                                    </div>
                                </div>

                                <Button
                                    onClick={handleActivation}
                                    className="w-full h-14 rounded-xl bg-primary hover:bg-white text-primary-foreground hover:text-primary font-black text-lg transition-all duration-300 shadow-xl shadow-primary/10 gap-2"
                                >
                                    <MessageCircle className="w-5 h-5" />
                                    تفعيل الآن مباشر
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default IboSolActivation;
