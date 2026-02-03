import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import AuthButton from "../AuthButton.jsx";

const CTASection = () => {
  return (
    <section className="py-24 px-4 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-r from-gradient-blue/20 via-gradient-purple/20 to-gradient-pink/20 blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto text-center relative z-10"
      >
        <h2 className="text-3xl md:text-5xl font-bold mb-6">
          <span className="text-foreground">Bridge the Gap Between </span>
          <br />
          <span className="text-gradient">Your Resume & Industry Requirements</span>
        </h2>
        <p className="text-muted-foreground text-lg mb-10 max-w-2xl mx-auto">
          Start your journey towards a job-ready resume today. Our AI-powered
          platform will guide you every step of the way.
        </p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto"
        >
          <Link to="/register" className="flex-1">
            <AuthButton variant="primary" className="group">
              Get Started
              <ArrowRight className="w-4 h-4 ml-2 inline-block transition-transform group-hover:translate-x-1" />
            </AuthButton>
          </Link>
          <Link to="/login" className="flex-1">
            <AuthButton variant="secondary">Login</AuthButton>
          </Link>
        </motion.div>
      </motion.div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="mt-24 text-center text-muted-foreground text-sm"
      >
        <p>© 2024 SkillGap AI. All rights reserved.</p>
      </motion.div>
    </section>
  );
};

export default CTASection;