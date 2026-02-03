import { motion } from "framer-motion";
import { 
  FileCheck, 
  Percent, 
  AlertTriangle, 
  Award, 
  Lightbulb,
  Zap
} from "lucide-react";

const features = [
  {
    icon: FileCheck,
    title: "ATS-Friendly Analysis",
    description: "Ensure your resume passes Applicant Tracking Systems with optimized formatting and keywords.",
  },
  {
    icon: Percent,
    title: "Skill Match Percentage",
    description: "See how well your skills align with industry requirements for your target roles.",
  },
  {
    icon: AlertTriangle,
    title: "Missing Skill Detection",
    description: "Identify critical skills you're missing that employers are looking for.",
  },
  {
    icon: Award,
    title: "Job Readiness Score",
    description: "Get an overall score indicating how prepared you are for your dream job.",
  },
  {
    icon: Lightbulb,
    title: "AI Learning Recommendations",
    description: "Receive personalized course and resource suggestions to bridge skill gaps.",
  },
  {
    icon: Zap,
    title: "Instant Analysis",
    description: "Get comprehensive results in seconds, not hours. Fast, accurate, and actionable.",
  },
];

const FeaturesSection = () => {
  return (
    <section className="py-24 px-4 relative">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            <span className="text-foreground">Powerful </span>
            <span className="text-gradient">Features</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Everything you need to optimize your resume and land your dream job
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <motion.div
                whileHover={{ y: -8, scale: 1.02 }}
                className="glass-card rounded-2xl p-6 h-full cursor-pointer group transition-all hover:shadow-[0_0_30px_rgba(139,92,246,0.15)]"
              >
                <div className="w-14 h-14 mb-4 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center transition-all group-hover:from-primary/30 group-hover:to-accent/30">
                  <feature.icon className="w-7 h-7 text-primary transition-transform group-hover:scale-110" />
                </div>
                <h3 className="font-semibold text-lg text-foreground mb-2 group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;