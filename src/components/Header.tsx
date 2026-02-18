import { MessageCircle, HelpCircle, Server, Download, Zap, Info, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { trackEvent } from "@/lib/analytics";
import logo from "@/assets/karmastore-logo.webp";

const Header = ({ onShowSection }: { onShowSection?: (id: string) => void }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const scrollToSection = (id: string) => {
    if (location.pathname !== "/") {
      navigate(`/#${id}`);
      return;
    }

    if (onShowSection && (id === 'activation' || id === 'downloads')) {
      onShowSection(id);
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <header className="sticky top-0 z-50 glass-effect border-b border-border/50">
      <div className="container flex items-center justify-between h-16 md:h-20">
        <Link to="/" className="group flex items-center gap-2">
          <div className="relative">
            <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full scale-110 group-hover:scale-125 transition-transform duration-500" />
            <img
              src={logo}
              alt="Karma Store"
              className="h-10 md:h-16 relative object-contain transition-all duration-500 group-hover:scale-105 group-hover:drop-shadow-[0_0_15px_rgba(var(--primary),0.4)]"
            />
          </div>
          <span className="text-xl font-black bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent hidden sm:block">
            KARMA STORE
          </span>
        </Link>

        <div className="flex items-center gap-1 md:gap-3 overflow-x-auto no-scrollbar py-2">
          <Button
            variant="ghost"
            onClick={() => scrollToSection('servers')}
            className="flex flex-col md:flex-row gap-1 items-center text-foreground/80 hover:text-primary hover:bg-primary/5 transition-all whitespace-nowrap px-2 h-auto py-1 md:py-2"
          >
            <Server className="w-4 h-4" />
            <span className="text-[9px] md:text-sm font-bold">السيرفرات</span>
          </Button>

          <Button
            variant="ghost"
            onClick={() => scrollToSection('activation')}
            className="flex flex-col md:flex-row gap-1 items-center text-foreground/80 hover:text-primary hover:bg-primary/5 transition-all whitespace-nowrap px-2 h-auto py-1 md:py-2"
          >
            <Zap className="w-4 h-4" />
            <span className="text-[9px] md:text-sm font-bold">تفعيل</span>
          </Button>

          <Button
            variant="ghost"
            onClick={() => scrollToSection('downloads')}
            className="flex flex-col md:flex-row gap-1 items-center text-foreground/80 hover:text-primary hover:bg-primary/5 transition-all whitespace-nowrap px-2 h-auto py-1 md:py-2"
          >
            <Download className="w-4 h-4" />
            <span className="text-[9px] md:text-sm font-bold">التطبيقات</span>
          </Button>

          <Button
            variant="ghost"
            onClick={() => scrollToSection('about')}
            className="flex flex-col md:flex-row gap-1 items-center text-foreground/80 hover:text-primary hover:bg-primary/5 transition-all whitespace-nowrap px-2 h-auto py-1 md:py-2"
          >
            <Info className="w-4 h-4" />
            <span className="text-[9px] md:text-sm font-bold">من نحن</span>
          </Button>

          <Button
            variant="ghost"
            onClick={() => scrollToSection('testimonials')}
            className="flex flex-col md:flex-row gap-1 items-center text-foreground/80 hover:text-primary hover:bg-primary/5 transition-all whitespace-nowrap px-2 h-auto py-1 md:py-2"
          >
            <Star className="w-4 h-4" />
            <span className="text-[9px] md:text-sm font-bold">الآراء</span>
          </Button>

          <Button
            asChild
            variant="ghost"
            className="flex flex-col md:flex-row gap-1 items-center text-foreground/80 hover:text-primary hover:bg-primary/5 transition-all whitespace-nowrap px-2 h-auto py-1 md:py-2"
          >
            <Link to="/faq">
              <HelpCircle className="w-4 h-4" />
              <span className="text-[9px] md:text-sm font-bold">الأسئلة</span>
            </Link>
          </Button>

          <Button
            asChild
            className="hidden md:flex gap-2 bg-gradient-to-r from-primary to-accent hover:opacity-90 text-primary-foreground font-bold shadow-[0_0_15px_rgba(var(--primary),0.3)] transition-all hover:scale-105 whitespace-nowrap px-3 md:px-5 text-[10px] md:text-sm h-9 md:h-11 shrink-0 ml-1"
          >
            <a
              href="https://wa.me/201114417978"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent("whatsapp_click", { location: "header_contact" })}
            >
              <MessageCircle className="w-3 h-3 md:w-4 md:h-4" />
              تواصل
            </a>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
