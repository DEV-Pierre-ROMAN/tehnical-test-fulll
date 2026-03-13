import styles from "./Header.module.css";
import { Button } from "./ui/Button";
import { Toggle } from "./ui/Toggle";
import { useTheme } from "../hooks/useTheme";
import { useEditModeContext } from "../contexts/EditModeContext/useEditModeContext";
import { Icon } from "./ui/Icon";
import { Typography } from "./ui/Typography";

export function Header() {
  const { theme, toggleTheme } = useTheme();
  const { isEditMode, toggleEditMode } = useEditModeContext();

  return (
    <header className={styles.header}>
      <Typography variant="h1">Github Search</Typography>
      <div className={styles.actions}>
        <Button variant="ghost" onClick={toggleEditMode}>
          <Icon name="squarePen" />
        </Button>
        <Toggle active={isEditMode} onToggle={toggleEditMode} />
        <span className={styles.separator} />
        <Button variant="ghost" onClick={toggleTheme}>
          <Icon name={theme === "light" ? "moon" : "sun"} />
        </Button>
      </div>
    </header>
  );
}
