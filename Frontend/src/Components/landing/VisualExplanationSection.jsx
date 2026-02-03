import { motion } from "framer-motion";
import { TrendingUp, CheckCircle2, BarChart3 } from "lucide-react";

const VisualExplanationSection = () => {
  return (
    <section className="py-24 px-4 relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Mock Dashboard Preview */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="glass-card rounded-3xl p-6 relative overflow-hidden">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h4 className="text-lg font-semibold text-foreground">Resume Analysis</h4>
                <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-sm">
                  Completed
                </span>
              </div>

              {/* Score Circle */}
              <div className="flex items-center gap-8 mb-6">
                <div className="relative w-32 h-32">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle
                      cx="64"
                      cy="64"
                      r="56"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="transparent"
                      className="text-muted"
                    />
                    <motion.circle
                      cx="64"
                      cy="64"
                      r="56"
                      stroke="url(#gradient)"
                      strokeWidth="8"
                      fill="transparent"
                      strokeLinecap="round"
                      initial={{ strokeDasharray: "0 352" }}
                      whileInView={{ strokeDasharray: "281.6 352" }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                    />
                    <defs>
                      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="hsl(var(--gradient-blue))" />
                        <stop offset="100%" stopColor="hsl(var(--gradient-purple))" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-3xl font-bold text-foreground">80%</span>
                  </div>
                </div>
                <div>
                  <p className="text-muted-foreground text-sm mb-1">Job Readiness</p>
                  <p className="text-2xl font-bold text-foreground">Great Match!</p>
                </div>
              </div>

              {/* Skill Bars */}
              <div className="space-y-4">
                {[
                  { skill: "Technical Skills", value: 85 },
                  { skill: "Experience Match", value: 75 },
                  { skill: "Keywords", value: 90 },
                ].map((item) => (
                  <div key={item.skill}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-muted-foreground">{item.skill}</span>
                      <span className="text-foreground font-medium">{item.value}%</span>
                    </div>
                    <div className="h-2 rounded-full bg-muted overflow-hidden">
                      <motion.div
                        className="h-full rounded-full bg-gradient-to-r from-gradient-blue to-gradient-purple"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${item.value}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: "easeOut" }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Missing Skills */}
              <div className="mt-6 p-4 rounded-xl bg-destructive/10 border border-destructive/20">
                <p className="text-sm text-destructive font-medium mb-2">Missing Skills Detected</p>
                <div className="flex flex-wrap gap-2">
                  {["Docker", "Kubernetes", "AWS"].map((skill) => (
                    <span key={skill} className="px-2 py-1 rounded-md bg-destructive/20 text-destructive text-xs">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Explanation Text */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              <span className="text-foreground">See Your Resume </span>
              <span className="text-gradient">Like Never Before</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              Our intelligent dashboard gives you a complete overview of your resume's
              strengths and areas for improvement. Visualize your skill gaps and get
              actionable insights to boost your career.
            </p>

            <div className="space-y-4">
              {[
                { icon: TrendingUp, text: "Track your progress over time" },
                { icon: CheckCircle2, text: "Get personalized recommendations" },
                { icon: BarChart3, text: "Compare with industry standards" },
              ].map((item, index) => (
                <motion.div
                  key={item.text}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="flex items-center gap-4"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-foreground">{item.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default VisualExplanationSection;