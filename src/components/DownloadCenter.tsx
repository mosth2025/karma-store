import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Monitor, Smartphone, Tv2, Download, Laptop, Info } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

const DEVICE_CATEGORIES = [
    {
        id: "android",
        name: "Android",
        description: "موبايل، تابلت، TV Box، أو شاشة أندرويد",
        icon: <Smartphone className="w-8 h-8" />,
        apps: [
            { name: "التطبيق الرسمي لسيرفر نوفا", type: "MediaFire APK", link: "https://www.mediafire.com/file/5k5eeuy8kzc5g4y/NOVA_V2_Ai%25284.0.1%2529.apk/file", buttonText: "سيرفر نوفا" },
            { name: "التطبيق الرسمي لسيرفر مارفيل", type: "APK Direct", link: "https://tayaara.store/marveltv.apk", buttonText: "سيرفر مارفيل" },
            { name: "التطبيق الرسمي لسيرفر هيدرا", type: "Official Store", link: "https://play.google.com/store/apps/details?id=com.Hydraprimeonline", buttonText: "سيرفر هيدرا" },
            { name: "التطبيق الرسمي لسيرفر عرب ليونز", type: "APK Direct", link: "https://tvshof.link/LTVN6", buttonText: "سيرفر عرب ليونز" },
            { name: "التطبيق الرسمي لسيرفر XTV PRO", type: "APK Direct", link: "http://eurofinal.site/XTV_PRO.apk", buttonText: "سيرفر XTV PRO" },
            { name: "التطبيق الرسمي لسيرفر MH", type: "APK Direct", link: "http://mhiptv.net/hyperx.apk", buttonText: "سيرفر MH" },
            { name: "IPTV Smarters Pro", type: "Downloader / APK", link: "https://aftv.news/6601865" },
            { name: "IBO Player", type: "Downloader / APK", link: "https://aftv.news/1171959" },
            { name: "Bob Player", type: "Downloader / APK", link: "https://aftv.news/815778" },
        ]
    },
    {
        id: "apple",
        name: "Apple Products",
        description: "iPhone, iPad, Apple TV",
        icon: <Monitor className="w-8 h-8" />,
        apps: [
            { name: "000 Player", type: "App Store", link: "https://apps.apple.com/us/app/000-player/id1665441224" },
            { name: "iPlay Hub", type: "App Store", link: "https://apps.apple.com/us/app/iplay-hub/id6751518936" },
            { name: "S Player Pro", type: "App Store", link: "https://apps.apple.com/sa/app/s-player-pro/id1616174252" },
        ]
    },
    {
        id: "windows",
        name: "Windows / PC",
        description: "كمبيوتر ولابتوب",
        icon: <Laptop className="w-8 h-8" />,
        apps: [
            { name: "IPTV Smarters Pro", type: "Windows EXE", link: "https://iptv-smarters-pro.en.uptodown.com/windows/download" },
        ]
    },
    {
        id: "smart_tv",
        name: "Smart TV",
        description: "Samsung & LG (شاشة سمارت)",
        icon: <Tv2 className="w-8 h-8" />,
        isGallery: true,
        apps: [
            { name: "IBO Player", img: "/apps-icons/ibopro.png" },
            { name: "HushPlay", img: "/apps-icons/ibo_special.png" },
            { name: "IBO VPN", img: "/apps-icons/ibovpn.png" },
            { name: "IboSol Player", img: "/apps-icons/ibosolplayer.png" },
            { name: "Smarters VPN", img: "/apps-icons/smartersvpn.png" },
            { name: "CR7 Player", img: "/apps-icons/cr7.png" },
            { name: "Messi Player", img: "/apps-icons/messi.png" },
            { name: "Bob Player", img: "/apps-icons/bobplayer.png" },
            { name: "Bob Pro", img: "/apps-icons/bobpro.png" },
            { name: "Bob Premium", img: "/apps-icons/bobpremium.png" },
            { name: "King 4K", img: "/apps-icons/bob_special.png" },
            { name: "Duplex Play", img: "/apps-icons/duplex.png" },
            { name: "Flix IPTV", img: "/apps-icons/flixnet.png" },
            { name: "SmartOne Pro", img: "/apps-icons/smartone.png" },
            { name: "SmartOne IPTV", img: "/apps-icons/smartoneiptv.webp" },
            { name: "ABE Player", img: "/apps-icons/abeplayer.png" },
            { name: "Mac Player", img: "/apps-icons/macplayer.png" },
            { name: "Virginia", img: "/apps-icons/virginia.png" },
            { name: "AllPlayer", img: "/apps-icons/allplayer.png" },
            { name: "KTN Player", img: "/apps-icons/ktnplayer.png" },
            { name: "Family Player", img: "/apps-icons/familyplayer.png" },
            { name: "Iboss Player", img: "/apps-icons/ibossplayer.png" },
            { name: "IboTB", img: "/apps-icons/ibostb.png" },
            { name: "Iboxx IPTV", img: "/apps-icons/iboxxplayer.png" },
            { name: "Ora Player", img: "/apps-icons/ora.png" },
            { name: "Smarters Player", img: "/apps-icons/smarters.png" },
            { name: "Hot Player", img: "/apps-icons/hotplayer.svg" },
        ]
    }
];

const DownloadCenter = () => {
    const [activeTab, setActiveTab] = useState("android");

    return (
        <section id="downloads" className="py-24 relative overflow-hidden">
            <div className="premium-blur top-0 right-0 w-[500px] h-[500px] bg-primary/5" />

            <div className="container px-4 mx-auto relative z-10">
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl md:text-6xl font-black text-white mb-6">
                            مركز <span className="text-gradient">التحميل</span>
                        </h2>
                        <p className="text-muted-foreground text-lg max-w-2xl mx-auto font-medium">
                            اختر نوع جهازك واستعرض أفضل التطبيقات المتاحة لبدء المشاهدة فوراً.
                        </p>
                    </motion.div>
                </div>

                {/* Device Selection Tabs */}
                <div className="flex flex-wrap justify-center gap-4 mb-12">
                    {DEVICE_CATEGORIES.map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => {
                                setActiveTab(cat.id);
                                trackEvent("download_tab_click", { device: cat.id });
                            }}
                            className={`flex items-center gap-3 px-8 py-4 rounded-2xl font-bold transition-all duration-300 ${activeTab === cat.id
                                    ? "bg-primary text-black shadow-[0_0_20px_rgba(251,191,36,0.3)] scale-105"
                                    : "bg-white/5 text-white/60 hover:bg-white/10"
                                }`}
                        >
                            {cat.icon}
                            <div className="text-right">
                                <span className="block text-sm leading-none">{cat.name}</span>
                                <span className={`text-[10px] font-normal ${activeTab === cat.id ? "text-black/70" : "text-white/30"}`}>{cat.description}</span>
                            </div>
                        </button>
                    ))}
                </div>

                {/* Content Area */}
                <div className="min-h-[400px]">
                    <AnimatePresence mode="wait">
                        {DEVICE_CATEGORIES.map((cat) => cat.id === activeTab && (
                            <motion.div
                                key={cat.id}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
                            >
                                {cat.apps.map((app, i) => (
                                    <motion.div
                                        key={i}
                                        whileHover={{ y: -5 }}
                                        className="glass-effect p-6 rounded-[2rem] border border-white/5 flex flex-col items-center text-center relative group overflow-hidden"
                                    >
                                        <div className={`w-20 h-20 rounded-2xl mb-4 p-3 flex items-center justify-center transition-transform group-hover:scale-110 shadow-xl border border-white/20 ${app.name.toLowerCase().includes('smarters') || app.name.toLowerCase().includes('hot player')
                                                ? "bg-slate-900"
                                                : "bg-gray-100"
                                            }`}>
                                            {app.img ? (
                                                <img src={app.img} alt={app.name} className="w-full h-full object-contain" />
                                            ) : (
                                                <div className="text-primary opacity-80 scale-150">
                                                    {cat.icon}
                                                </div>
                                            )}
                                        </div>
                                        <h4 className="text-white font-bold mb-1">{app.name}</h4>
                                        {app.type && <p className="text-[10px] text-primary font-bold uppercase tracking-widest mb-4">{app.type}</p>}

                                        {cat.isGallery ? (
                                            <div className="mt-2 text-[10px] text-muted-foreground bg-white/5 py-2 px-4 rounded-full">
                                                ابحث عنه في متجر الشاشة 📺
                                            </div>
                                        ) : (
                                            <a
                                                href={app.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                onClick={() => trackEvent("app_download_click", { app_name: app.name, platform: cat.id })}
                                                className="w-full bg-primary/10 hover:bg-primary text-primary hover:text-black py-3 rounded-xl transition-all duration-300 font-bold text-xs flex items-center justify-center gap-2"
                                            >
                                                {app.buttonText || "تحميل الآن"} <Download className="w-4 h-4" />
                                            </a>
                                        )}

                                        {/* Background Glow for icons */}
                                        <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                                    </motion.div>
                                ))}
                            </motion.div>
                        ))}
                    </AnimatePresence>

                    {activeTab === "smart_tv" && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="mt-12 p-8 bg-primary/5 rounded-[2.5rem] border border-primary/20 text-center max-w-4xl mx-auto"
                        >
                            <div className="flex flex-col items-center gap-6" style={{ direction: 'rtl' }}>
                                <div className="bg-primary/10 p-4 rounded-full">
                                    <Info className="w-8 h-8 text-primary" />
                                </div>
                                <div className="space-y-4">
                                    <h5 className="text-white font-bold text-2xl">نصيحة ذهبية لمستخدمي الشاشات السمارت 📺</h5>
                                    <p className="text-lg text-muted-foreground leading-relaxed">
                                        نوصي بشدة بتنزيل تطبيقات <span className="text-primary font-bold">IBO PLAYER - BOB PLAYER - DUPLEX TV - SMARTONE PRO</span> معاً على شاشتك.
                                    </p>
                                    <div className="bg-white/5 p-6 rounded-2xl border border-white/5 text-center">
                                        <p className="text-white font-medium leading-relaxed">
                                            هذه التطبيقات يتم تنشيطها جميعاً <span className="text-primary font-black underline">بنفس مدة التفعيل</span> (سنوي أو مدى الحياة)،
                                            وهي تعمل كبدائل ممتازة لبعضها تضمن لك أعلى درجات الاستقرار والجاهزية طوال فترة اشتراكك.
                                        </p>
                                    </div>
                                    <p className="text-sm text-primary/80 font-bold">
                                        بمجرد تحميل التطبيق، صور كود الماك (MAC Address) وأرسله للدعم الفني للتفعيل فوراً.
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default DownloadCenter;
