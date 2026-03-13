import type { InputHTMLAttributes } from "react";
import styles from "./CheckBox.module.css";

const variantStyles = {
  default: styles.default,
  minus: styles.minus,
} as const;

type CheckBoxVariant = keyof typeof variantStyles;

type CheckBoxProps = {
  variant?: CheckBoxVariant;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "type">;

export function CheckBox({
  variant = "default",
  className,
  ...checkBoxProps
}: CheckBoxProps) {
  const classes = [styles.checkbox, variantStyles[variant], className]
    .filter(Boolean)
    .join(" ");

  return <input {...checkBoxProps} type="checkbox" className={classes} />;
}
