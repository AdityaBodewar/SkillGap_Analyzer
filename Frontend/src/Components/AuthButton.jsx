const AuthButton = ({ children, variant = "primary", className = "", ...props }) => {
  const baseStyles = `
    w-full py-3.5 px-6 rounded-xl font-semibold text-sm
    transition-all duration-300 ease-out
    disabled:opacity-50 disabled:cursor-not-allowed
    transform active:scale-[0.98]
  `;

  const variants = {
    primary: `
      bg-gradient-primary text-primary-foreground
      btn-glow hover:brightness-110
    `,
    secondary: `
      bg-secondary text-secondary-foreground
      hover:bg-secondary/80 border border-border/50
    `,
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default AuthButton;