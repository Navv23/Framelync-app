import React from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, ChevronRight } from "lucide-react";

const Button = ({ 
  to, 
  onClick,
  children, 
  variant = "primary", 
  size = "default",
  icon = "arrow",
  className = "",
  type = "button"
}) => {
  // Define the base styles
  const baseStyles = "flex items-center gap-2 font-medium rounded-full transition-all transform hover:scale-105 shadow-md";
  
  // Define variant styles
  const variantStyles = {
    primary: "bg-[#123557] text-white hover:bg-[#123557]/90",
    secondary: "bg-blue-600 text-white hover:bg-blue-700",
    outline: "bg-transparent border-2 border-white text-white hover:bg-white/10",
    text: "bg-transparent text-blue-600 hover:text-blue-800 shadow-none"
  };
  
  // Define size styles
  const sizeStyles = {
    small: "px-4 py-2 text-sm",
    default: "px-6 py-3",
    large: "px-8 py-4 text-lg"
  };
  
  // Choose the icon
  const IconComponent = icon === "arrow" ? ArrowUpRight : ChevronRight;
  
  // Combine all styles
  const combinedStyles = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;
  
  // If it's a link, render a Link component
  if (to) {
    return (
      <Link to={to} className={combinedStyles}>
        {children} <IconComponent size={variant === "text" ? 16 : 18} />
      </Link>
    );
  }
  
  // Otherwise render a button
  return (
    <button type={type} onClick={onClick} className={combinedStyles}>
      {children} <IconComponent size={variant === "text" ? 16 : 18} />
    </button>
  );
};

export default Button;