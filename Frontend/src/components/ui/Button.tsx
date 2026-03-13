import { type ComponentPropsWithRef, type ElementType, type Ref, forwardRef } from "react";
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
} & ComponentPropsWithRef<T>;

function ButtonInner<T extends ElementType = "button">(
  { as, variant = "default", className, ...props }: ButtonProps<T>,
  ref: Ref<Element>,
) {
  const Component = as ?? "button";
  const classes = [styles.button, variantStyles[variant], className]
    .filter(Boolean)
    .join(" ");

  return <Component {...props} ref={ref} className={classes} />;
}

export const Button = forwardRef(ButtonInner) as <T extends ElementType = "button">(
  props: ButtonProps<T> & { ref?: Ref<Element> },
) => JSX.Element;
