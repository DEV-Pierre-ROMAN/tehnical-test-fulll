import type { ComponentPropsWithoutRef, ElementType } from "react";
import styles from "./Typography.module.css";

const variantStyles = {
  h1: styles.h1,
  h2: styles.h2,
  body: styles.body,
  bodySm: styles.bodySm,
  caption: styles.caption,
  muted: styles.muted,
} as const;

type TypographyVariant = keyof typeof variantStyles;

const defaultElements: Record<TypographyVariant, ElementType> = {
  h1: "h1",
  h2: "h2",
  body: "p",
  bodySm: "p",
  caption: "p",
  muted: "p",
};

type TypographyProps<T extends ElementType = "p"> = {
  as?: T;
  variant?: TypographyVariant;
} & ComponentPropsWithoutRef<T>;

export function Typography<T extends ElementType = "p">({
  as,
  variant = "body",
  className,
  ...props
}: TypographyProps<T>) {
  const Component = as ?? defaultElements[variant];
  const classes = [styles.base, variantStyles[variant], className]
    .filter(Boolean)
    .join(" ");

  return <Component {...props} className={classes} />;
}
