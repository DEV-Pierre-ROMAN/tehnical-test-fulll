import styles from "./Header.module.css";
import { Button } from "./ui/Button";
import { useTheme } from "../hooks/useTheme";
import { Icon } from "./ui/Icon";
import { Typography } from "./ui/Typography";

export function Header() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className={styles.header}>
      <Typography variant="h1">Github Search</Typography>
      <Button variant="ghost" onClick={toggleTheme} className={styles.themeToggle}>
        <Icon name={theme === "light" ? "moon" : "sun"} />
      </Button>
    </header>
  );
}
