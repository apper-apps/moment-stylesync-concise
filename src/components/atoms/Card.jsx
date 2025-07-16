import { forwardRef } from "react";
import { motion } from "framer-motion";
import { cn } from "@/utils/cn";

const Card = forwardRef(({ 
  className, 
  children, 
  hover = true,
  onClick,
  ...props 
}, ref) => {
  const baseStyles = "glass-card rounded-3xl p-6 premium-shadow transition-all duration-300";
  const hoverStyles = hover ? "hover:premium-shadow-lg hover:scale-[1.02]" : "";
  const clickableStyles = onClick ? "cursor-pointer" : "";
  
  if (onClick) {
    return (
      <motion.div
        ref={ref}
        className={cn(baseStyles, hoverStyles, clickableStyles, className)}
        onClick={onClick}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
  
  return (
    <div
      ref={ref}
      className={cn(baseStyles, hoverStyles, className)}
      {...props}
    >
      {children}
    </div>
  );
});

Card.displayName = "Card";

export default Card;