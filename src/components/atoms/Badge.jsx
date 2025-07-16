import { forwardRef } from "react";
import { cn } from "@/utils/cn";

const Badge = forwardRef(({ 
  className, 
  variant = "default", 
  children, 
  ...props 
}, ref) => {
  const baseStyles = "inline-flex items-center px-3 py-1 text-xs font-medium rounded-full transition-all duration-200";
  
  const variants = {
    default: "bg-gray-100 text-gray-700 hover:bg-gray-200",
    primary: "bg-accent/10 text-accent hover:bg-accent/20",
    secondary: "bg-secondary text-primary hover:bg-gray-300",
    success: "bg-success/10 text-success hover:bg-success/20",
    warning: "bg-warning/10 text-warning hover:bg-warning/20",
    error: "bg-error/10 text-error hover:bg-error/20",
  };
  
  const variantStyles = variants[variant] || variants.default;
  
  return (
    <span
      ref={ref}
      className={cn(baseStyles, variantStyles, className)}
      {...props}
    >
      {children}
    </span>
  );
});

Badge.displayName = "Badge";

export default Badge;