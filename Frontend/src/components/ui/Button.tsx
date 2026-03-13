import type { ComponentPropsWithoutRef, ElementType } from "react";
import styles from "./Button.module.css";

const variantStyles = {
  default: styles.default,
  ghost: styles.ghost,
  link: styles.link,
} as const;

type ButtonVariant = keyof typeof variantStyles;

type ButtonProps<T extends ElementType = "button"> = {
  as?: T;
  variant?: ButtonVariant;
} & ComponentPropsWithoutRef<T>;

export function Button<T extends ElementType = "button">({
  as,
  variant = "default",
  className,
  ...props
}: ButtonProps<T>) {
  const Component = as ?? "button";
  const classes = [styles.button, variantStyles[variant], className]
    .filter(Boolean)
    .join(" ");

  return <Component {...props} className={classes} />;
}
