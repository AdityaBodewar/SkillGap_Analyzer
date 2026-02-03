import { useState } from "react";
import { Eye, EyeOff, Mail, Lock, User } from "lucide-react";

const iconMap = {
  mail: Mail,
  lock: Lock,
  user: User,
};

const AuthInput = ({ icon, label, type, ...props }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  
  const Icon = iconMap[icon];
  const isPassword = type === "password";
  const inputType = isPassword ? (showPassword ? "text" : "password") : type;

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-foreground/80">{label}</label>
      <div 
        className={`
          relative flex items-center rounded-xl bg-input/50 border border-border/50
          transition-all duration-300 ease-out
          ${isFocused ? "input-glow border-primary/50" : "hover:border-border"}
        `}
      >
        <div className="pl-4 text-muted-foreground">
          <Icon className="h-5 w-5" />
        </div>
        <input
          type={inputType}
          className="
            flex-1 bg-transparent px-4 py-3.5 text-foreground placeholder:text-muted-foreground/60
            focus:outline-none text-sm
          "
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...props}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="pr-4 text-muted-foreground hover:text-foreground transition-colors"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5" />
            ) : (
              <Eye className="h-5 w-5" />
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default AuthInput;