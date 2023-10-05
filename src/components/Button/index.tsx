import { ButtonHTMLAttributes } from "react";
import buttonStyle from "./Button.module.css";
import Link from "next/link";

export type ButtonProps = {
  variant?: "primary" | "secondary";
  size?: "small" | "medium";
  loading?: boolean;
  href?: string;
  isExternal?: boolean;
  children: React.ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({
  type = "button",
  variant = "primary",
  size = "medium",
  loading = false,
  href,
  isExternal = false,
  children,
  className,
  ...props
}: ButtonProps) {
  if (href) {
    if (isExternal) {
      return (
        <a href={href} className={`buttonLink ${className}`}>
          {children}
        </a>
      );
    }

    return (
      <Link href={href} className={`buttonLink ${className}`}>
        {children}
      </Link>
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
