import type { ButtonHTMLAttributes } from "react";
import styles from "./Toggle.module.css";

type ToggleProps = {
  active: boolean;
  onToggle: () => void;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onClick">;

export function Toggle({ active, onToggle, className, ...props }: ToggleProps) {
  const classes = [styles.toggle, active ? styles.active : "", className]
    .filter(Boolean)
    .join(" ");

  return <button {...props} type="button" className={classes} onClick={onToggle} />;
}
