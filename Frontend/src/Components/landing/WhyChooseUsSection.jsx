import { motion } from "framer-motion";
import { Check, Sparkles } from "lucide-react";

const benefits = [
  "AI-powered analysis for accurate insights",
  "Industry-aligned skill recommendations",
  "Student-focused design and pricing",
  "Fast & easy-to-understand results",
  "Privacy-first approach to your data",
  "Regular updates with latest job trends",
];

const WhyChooseUsSection = () => {
  return (
    <section className="py-24 px-4 relative">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="glass-card rounded-3xl p-8 md:p-12 relative overflow-hidden"
        >
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full blur-3xl" />
          
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-primary" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold">
                <span className="text-foreground">Why Choose </span>
                <span className="text-gradient">Us?</span>
              </h2>
            </div>

            <p className="text-muted-foreground text-lg mb-8 max-w-2xl">
              We're committed to helping you bridge the gap between where you are
              and where you want to be in your career.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="flex items-center gap-3 group"
                >
                  <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/30 transition-colors">
                    <Check className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-foreground">{benefit}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;