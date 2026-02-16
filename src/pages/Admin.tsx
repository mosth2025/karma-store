import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Settings, Shield, Activity, Eye, EyeOff, RefreshCcw, LayoutDashboard, Lock, User as UserIcon, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import IboSolActivation from "@/components/IboSolActivation";

const API_BASE = "http://localhost:3001/api";

const Admin = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loginLoading, setLoginLoading] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [showActivation, setShowActivation] = useState(false);
    const [logs, setLogs] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const { toast } = useToast();

    // Check if token exists in session
    useEffect(() => {
        const token = sessionStorage.getItem("admin_token");
        if (token === "karma-secret-token-2026") {
            setIsAuthenticated(true);
        }
    }, []);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoginLoading(true);
        try {
            const res = await fetch(`${API_BASE}/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password })
            });
            const data = await res.json();
            if (data.success) {
                sessionStorage.setItem("admin_token", data.token);
                setIsAuthenticated(true);
                toast({ title: "تم تسجيل الدخول بنجاح" });
            } else {
                toast({ title: "خطأ في البيانات", description: "اسم المستخدم أو كلمة المرور غير صحيحة.", variant: "destructive" });
            }
        } catch (error) {
            toast({ title: "خطأ", description: "تعذر الاتصال بالسيرفر.", variant: "destructive" });
        } finally {
            setLoginLoading(false);
        }
    };

    const fetchData = async () => {
        if (!isAuthenticated) return;
        try {
            const [settingsRes, logsRes] = await Promise.all([
                fetch(`${API_BASE}/settings`),
                fetch(`${API_BASE}/logs`)
            ]);
            const settings = await settingsRes.json();
            const logsData = await logsRes.json();

            setShowActivation(settings.showActivation);
            setLogs(logsData);
        } catch (error) {
            console.error("Failed to fetch admin data", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (isAuthenticated) {
            fetchData();
            const interval = setInterval(fetchData, 10000); // Auto refresh logs every 10s
            return () => clearInterval(interval);
        }
    }, [isAuthenticated]);

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-[#050505] text-white font-cairo flex items-center justify-center p-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="w-full max-w-md"
                >
                    <Card className="bg-white/5 border-white/10 p-8 backdrop-blur-xl space-y-8">
                        <div className="text-center space-y-2">
                            <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center mx-auto border border-primary/20 shadow-lg shadow-primary/10">
                                <Lock className="w-8 h-8 text-primary" />
                            </div>
                            <h1 className="text-2xl font-black text-white">منطقة <span className="text-gradient">محظورة</span></h1>
                            <p className="text-muted-foreground text-sm">برجاء إدخال بيانات الإدارة للمتابعة</p>
                        </div>

                        <form onSubmit={handleLogin} className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-white/40 uppercase tracking-widest px-1">اسم المستخدم</label>
                                <div className="relative">
                                    <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                                    <Input
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        placeholder="Admin Username"
                                        className="bg-black/40 border-white/5 h-12 pl-12 focus:border-primary/50 transition-all text-white placeholder:text-white/10"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-white/40 uppercase tracking-widest px-1">كلمة المرور</label>
                                <div className="relative">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                                    <Input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="••••••••"
                                        className="bg-black/40 border-white/5 h-12 pl-12 focus:border-primary/50 transition-all text-white placeholder:text-white/10"
                                    />
                                </div>
                            </div>
                            <Button
                                type="submit"
                                disabled={loginLoading}
                                className="w-full h-12 bg-primary hover:bg-white text-primary-foreground hover:text-primary font-black text-lg transition-all duration-300 mt-4 gap-2"
                            >
                                {loginLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : "دخول للوحة التحكم"}
                            </Button>
                        </form>
                    </Card>
                </motion.div>
            </div>
        );
    }

    const toggleActivation = async (val: boolean) => {
        try {
            const res = await fetch(`${API_BASE}/settings`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ showActivation: val })
            });
            if (res.ok) {
                setShowActivation(val);
                toast({
                    title: val ? "تم تفعيل القسم" : "تم إخفاء القسم",
                    description: val ? "قسم التفعيلات متاح الآن للجمهور." : "قسم التفعيلات مخفي الآن عن الجمهور.",
                });
            }
        } catch (error) {
            toast({
                title: "خطأ",
                description: "لم نتمكن من تحديث الإعدادات.",
                variant: "destructive"
            });
        }
    };

    return (
        <div className="min-h-screen bg-[#050505] text-white font-cairo p-4 md:p-8">
            <div className="max-w-7xl mx-auto space-y-8">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-8">
                    <div>
                        <h1 className="text-3xl font-black flex items-center gap-3">
                            <Shield className="text-primary w-8 h-8" />
                            لوحة تحكم <span className="text-gradient">كارما ستور</span>
                        </h1>
                        <p className="text-muted-foreground mt-2">إدارة الموقع، التقارير، وأدوات التفعيل</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <Button variant="outline" size="sm" onClick={fetchData} className="gap-2 border-white/10 bg-white/5">
                            <RefreshCcw className="w-4 h-4" />
                            تحديث البيانات
                        </Button>
                        <div className="bg-primary/10 border border-primary/20 px-4 py-2 rounded-full flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                            <span className="text-xs font-bold text-primary tracking-wider uppercase">Live System Active</span>
                        </div>
                    </div>
                </div>

                <div className="grid lg:grid-cols-[350px_1fr] gap-8">
                    {/* Sidebar Controls */}
                    <div className="space-y-6">
                        <Card className="bg-white/5 border-white/10 p-6 space-y-6 backdrop-blur-xl">
                            <h2 className="text-xl font-bold flex items-center gap-2">
                                <Settings className="w-5 h-5 text-primary" />
                                إعدادات الظهور
                            </h2>

                            <div className="flex items-center justify-between p-4 bg-black/40 rounded-2xl border border-white/5 hover:border-primary/30 transition-all">
                                <div className="space-y-1">
                                    <p className="text-sm font-bold">قسم التفعيلات</p>
                                    <p className="text-[10px] text-muted-foreground">عرض/إخفاء في الصفحة الرئيسية</p>
                                </div>
                                <Switch
                                    checked={showActivation}
                                    onCheckedChange={toggleActivation}
                                />
                            </div>

                            <div className="pt-4 border-t border-white/5">
                                <div className="flex items-center gap-2 mb-4 text-muted-foreground">
                                    <Activity className="w-4 h-4" />
                                    <span className="text-xs font-bold uppercase tracking-widest">أحدث النشاطات</span>
                                </div>
                                <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                                    {logs.length === 0 ? (
                                        <p className="text-center text-xs text-white/20 py-8">لا يوجد نشاط مسجل حالياً</p>
                                    ) : (
                                        logs.map((log, i) => (
                                            <div key={i} className="text-[10px] font-mono p-2 bg-black/20 rounded-lg border border-white/5 hover:border-white/10 transition-colors">
                                                {log}
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>
                        </Card>
                    </div>

                    {/* Main Content Area */}
                    <div className="space-y-6">
                        <div className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden">
                            <div className="p-6 border-b border-white/10 bg-white/[0.02] flex items-center justify-between">
                                <h2 className="text-xl font-bold flex items-center gap-2">
                                    <LayoutDashboard className="w-5 h-5 text-primary" />
                                    معاينة أدوات التفعيل
                                </h2>
                                {!showActivation && (
                                    <span className="text-[10px] font-bold bg-amber-500/20 text-amber-500 px-3 py-1 rounded-full flex items-center gap-1">
                                        <EyeOff className="w-3 h-3" />
                                        مخفي عن الزوار
                                    </span>
                                )}
                                {showActivation && (
                                    <span className="text-[10px] font-bold bg-emerald-500/20 text-emerald-500 px-3 py-1 rounded-full flex items-center gap-1">
                                        <Eye className="w-3 h-3" />
                                        مرئي للزوار
                                    </span>
                                )}
                            </div>
                            <div className="p-4 md:p-8 opacity-90 hover:opacity-100 transition-opacity">
                                <div className="scale-95 origin-top transform-gpu">
                                    <IboSolActivation />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Admin;
