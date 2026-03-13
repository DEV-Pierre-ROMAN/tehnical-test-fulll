import { useRef } from "react";
import { useSelectionContext } from "../contexts/SelectionContext/useSelectionContext";
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
  const linkRef = useRef<HTMLAnchorElement>(null);

  return (
    <div
      className={`${styles.card} ${isSelected(user.id) ? styles.selected : ""}`}
      onClick={(e) => {
        if (linkRef.current?.contains(e.target as Node)) return;
        toggleSelection(user.id);
      }}
    >
      <CheckBox
        className={styles.checkbox}
        checked={isSelected(user.id)}
        onChange={() => toggleSelection(user.id)}
      />
      <img className={styles.avatar} src={user.avatar_url} alt={user.login} />
      <Typography variant="caption" className={styles.id} title={String(user.id)}>{user.id}</Typography>
      <Typography variant="h2" className={styles.login} title={user.login}>{user.login}</Typography>
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
