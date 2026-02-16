import { Tv, Film, Trophy, BookOpen, Mic, Moon } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  { icon: Trophy, label: "رياضة", color: "text-green-400" },
  { icon: Film, label: "أفلام", color: "text-red-400" },
  { icon: Tv, label: "مسلسلات", color: "text-blue-400" },
  { icon: Mic, label: "برامج ترفيهية", color: "text-yellow-400" },
  { icon: Moon, label: "دينية", color: "text-emerald-400" },
  { icon: BookOpen, label: "تعليمية", color: "text-purple-400" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.8 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring" as const,
      stiffness: 200,
      damping: 15,
    },
  },
};

const Features = () => {
  return (
    <section className="py-12 bg-muted/30">
      <div className="container">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-2xl font-bold text-center text-foreground mb-8"
        >
          منصة واحدة تجمع كل ما تحبه
        </motion.h2>
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="flex flex-wrap justify-center gap-4 md:gap-8"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.label}
              variants={itemVariants}
              whileHover={{ 
                scale: 1.1, 
                y: -5,
                boxShadow: "0 10px 30px rgba(0,0,0,0.3)"
              }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 bg-card px-4 py-3 rounded-lg border border-border cursor-pointer"
            >
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              >
                <feature.icon className={`w-5 h-5 ${feature.color}`} />
              </motion.div>
              <span className="text-foreground font-medium">{feature.label}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Features;
