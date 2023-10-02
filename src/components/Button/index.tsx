import { ButtonHTMLAttributes } from "react";
import buttonStyle from "./Button.module.css";

export type ButtonProps = {
  variant?: "primary" | "secondary";
  size?: "small" | "medium";
  loading?: boolean;
  href?: string;
  children: React.ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({
  type = "button",
  variant = "primary",
  size = "medium",
  loading = false,
  href,
  children,
  className,
  ...props
}: ButtonProps) {
  if (href) {
    return (
      <a href={href} className={`buttonLink ${className}`}>
        {children}
      </a>
    );
  }

  return (
    <button
      type={type}
      data-loading={loading}
      data-size={size}
      data-variant={variant}
      disabled={loading || props.disabled}
      className={`${buttonStyle.button} ${className}`}
      {...props}
    >
      {loading ? "Loading..." : <>{children}</>}
    </button>
  );
}
