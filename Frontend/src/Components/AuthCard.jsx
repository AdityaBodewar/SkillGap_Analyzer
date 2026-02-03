const AuthCard = ({ children, title, subtitle }) => {
  return (
    <div className="w-full max-w-md animate-fade-up">
      <div className="glass-card rounded-2xl p-8 md:p-10">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gradient mb-2">
            {title}
          </h1>
          {subtitle && (
            <p className="text-muted-foreground text-sm">{subtitle}</p>
          )}
        </div>
        {children}
      </div>
    </div>
  );
};

export default AuthCard;