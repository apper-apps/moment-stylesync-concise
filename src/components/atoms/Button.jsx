import { forwardRef } from "react";
import { motion } from "framer-motion";
import { cn } from "@/utils/cn";

const Button = forwardRef(({ 
  className, 
  variant = "primary", 
  size = "md", 
  children, 
  disabled,
  ...props 
}, ref) => {
  const baseStyles = "inline-flex items-center justify-center font-medium transition-all duration-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-gradient-to-r from-accent to-accent/90 hover:from-accent/90 hover:to-accent/80 text-white shadow-lg hover:shadow-xl focus:ring-accent/50",
    secondary: "bg-white border-2 border-gray-200 hover:border-accent/50 text-primary hover:bg-accent/5 focus:ring-accent/50",
    outline: "border-2 border-accent text-accent hover:bg-accent hover:text-white focus:ring-accent/50",
    ghost: "text-gray-600 hover:text-accent hover:bg-accent/5 focus:ring-accent/50",
    danger: "bg-gradient-to-r from-error to-error/90 hover:from-error/90 hover:to-error/80 text-white shadow-lg hover:shadow-xl focus:ring-error/50"
  };
  
  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg"
  };
  
  const variantStyles = variants[variant] || variants.primary;
  const sizeStyles = sizes[size] || sizes.md;
  
  return (
    <motion.button
      ref={ref}
      className={cn(baseStyles, variantStyles, sizeStyles, className)}
      disabled={disabled}
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      {...props}
    >
      {children}
    </motion.button>
  );
});

Button.displayName = "Button";

export default Button;