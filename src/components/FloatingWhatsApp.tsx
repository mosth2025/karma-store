import { MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

const FloatingWhatsApp = () => {
    return (
        <motion.a
            href="https://wa.me/201114417978"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            whileHover={{ scale: 1.1, rotate: 10 }}
            whileTap={{ scale: 0.9 }}
            className="fixed bottom-6 right-6 z-[100] bg-[#25D366] text-white p-3 md:p-4 rounded-full shadow-[0_10px_30px_rgba(37,211,102,0.4)] flex items-center justify-center group"
        >
            <div className="absolute -top-12 right-0 bg-white text-black text-xs font-bold px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-lg border border-border pointer-events-none">
                تحتاج مساعدة؟ تواصل معنا 💬
                <div className="absolute -bottom-1 right-4 w-2 h-2 bg-white rotate-45 border-r border-b border-border" />
            </div>
            <MessageCircle className="w-6 h-6 md:w-7 md:h-7" />
            <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-25" />
        </motion.a>
    );
};

export default FloatingWhatsApp;
