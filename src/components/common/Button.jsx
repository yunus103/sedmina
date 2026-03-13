import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import { Link } from "../../i18n/routing";

const MotionLink = motion.create(Link);

const variants = {
  primary: `inline-flex items-center justify-center gap-2 px-6 py-3 
            bg-text-primary text-background font-semibold rounded-full
            transition-all duration-300 
            hover:scale-105
            focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background`,
  secondary: `inline-flex items-center justify-center gap-2 px-6 py-3 
              border border-text-primary/20 text-text-primary font-medium rounded-full
              transition-all duration-300 
              hover:border-primary hover:text-primary
              focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background`,
  ghost: `inline-flex items-center justify-center gap-2 px-4 py-2 
          text-text-primary font-medium
          transition-all duration-300 
          hover:text-primary`,
  icon: `inline-flex items-center justify-center w-12 h-12
         border border-text-primary/20 text-text-primary rounded-full
         transition-all duration-300 
         hover:border-primary hover:text-primary`,
};

const icons = {
  arrow: ArrowRight,
  play: Play,
};

export default function Button({
  children,
  variant = "primary",
  icon,
  iconPosition = "right",
  href,
  onClick,
  className = "",
  ...props
}) {
  const IconComponent = icon ? icons[icon] || icon : null;

  const content = (
    <>
      {IconComponent && iconPosition === "left" && (
        <IconComponent className="w-4 h-4" />
      )}
      {children}
      {IconComponent && iconPosition === "right" && (
        <IconComponent className="w-4 h-4" />
      )}
    </>
  );

  const buttonClasses = `${variants[variant]} ${className}`;

  if (href) {
    return (
      <MotionLink
        href={href}
        className={buttonClasses}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
        {...props}
      >
        {content}
      </MotionLink>
    );
  }

  return (
    <motion.button
      onClick={onClick}
      className={buttonClasses}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
      {...props}
    >
      {content}
    </motion.button>
  );
}
