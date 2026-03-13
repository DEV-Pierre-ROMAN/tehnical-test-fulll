import styles from "./Header.module.css";
import { Button } from "./ui/Button";
import { useTheme } from "../hooks/useTheme";
import { Icon } from "./ui/Icon";

export function Header() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className={styles.header}>
      <h1 className={styles.title}>Github Search</h1>
      <Button variant="ghost" onClick={toggleTheme} className={styles.themeToggle}>
        <Icon name={theme === "light" ? "moon" : "sun"} />
      </Button>
    </header>
  );
}
