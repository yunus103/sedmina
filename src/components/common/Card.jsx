"use client";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export default function Card({
  children,
  className = "",
  hover = true,
  onClick,
  showArrow = false,
  ...props
}) {
  return (
    <motion.div
      className={`
        relative bg-surface/80 backdrop-blur-md border border-text-primary/10 rounded-2xl
        overflow-hidden
        ${hover ? "transition-all duration-500 hover:bg-surface-light/80 hover:border-text-primary/20" : ""}
        ${className}
      `}
      whileHover={hover ? { y: -8, transition: { duration: 0.3 } } : {}}
      onClick={onClick}
      {...props}
    >
      {showArrow && (
        <div className="absolute top-4 right-4 z-10">
          <motion.div
            className="w-8 h-8 rounded-full bg-text-primary/10 backdrop-blur-sm flex items-center justify-center"
            whileHover={{
              scale: 1.1,
              backgroundColor: "rgba(0, 212, 255, 0.3)",
            }}
          >
            <ArrowUpRight className="w-4 h-4 text-text-primary" />
          </motion.div>
        </div>
      )}
      {children}
    </motion.div>
  );
}

export function CardImage({ src, alt, className = "" }) {
  return (
    <div
      className={`relative w-full aspect-[4/3] overflow-hidden ${className}`}
    >
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
    </div>
  );
}

export function CardContent({ children, className = "" }) {
  return <div className={`p-6 ${className}`}>{children}</div>;
}

export function CardTitle({ children, className = "" }) {
  return (
    <h3 className={`text-xl font-bold text-text-primary mb-2 ${className}`}>
      {children}
    </h3>
  );
}

export function CardDescription({ children, className = "" }) {
  return (
    <p className={`text-text-secondary text-sm leading-relaxed ${className}`}>
      {children}
    </p>
  );
}
