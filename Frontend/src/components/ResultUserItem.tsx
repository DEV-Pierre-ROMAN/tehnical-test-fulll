import { useRef } from "react";
import { useSelectionContext } from "../contexts/SelectionContext/useSelectionContext";
import { useEditModeContext } from "../contexts/EditModeContext/useEditModeContext";
import { useDelayedUnmount } from "../hooks/useDelayedUnmount";
import type { User } from "../types";
import styles from "./ResultUserItem.module.css";
import { Button } from "./ui/Button";
import { CheckBox } from "./ui/CheckBox";
import { Typography } from "./ui/Typography";

type ResultItemProps = {
  user: User;
};

export function ResultItem({ user }: ResultItemProps) {
  const { isSelected, toggleSelection } = useSelectionContext();
  const { isEditMode } = useEditModeContext();
  const { mounted: checkboxMounted, visible: checkboxVisible } = useDelayedUnmount(isEditMode, 250);
  const linkRef = useRef<HTMLAnchorElement>(null);
  const selected = isEditMode && isSelected(user.id);

  return (
    <div
      className={`${styles.card} ${isEditMode ? styles.editable : ""} ${selected ? styles.selected : ""}`}
      onClick={(e) => {
        if (!isEditMode) return;
        if (linkRef.current?.contains(e.target as Node)) return;
        toggleSelection(user.id);
      }}
    >
      {checkboxMounted && (
        <CheckBox
          className={`${styles.checkbox} ${checkboxVisible ? styles.checkboxEntering : styles.checkboxExiting}`}
          checked={isSelected(user.id)}
          onClick={(e) => e.stopPropagation()}
          onChange={() => toggleSelection(user.id)}
        />
      )}
      <img className={styles.avatar} src={user.avatar_url} alt={user.login} />
      <Typography
        variant="caption"
        className={styles.id}
        title={String(user.id)}
      >
        {user.id}
      </Typography>
      <Typography variant="h2" className={styles.login} title={user.login}>
        {user.login}
      </Typography>
      <Button
        as="a"
        ref={linkRef}
        className={styles.profileLink}
        href={user.url}
        target="_blank"
        rel="noopener noreferrer"
      >
        View profile
      </Button>
    </div>
  );
}
