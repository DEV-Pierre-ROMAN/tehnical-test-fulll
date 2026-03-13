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

  return (
    <div className={styles.card}>
      <CheckBox
        className={styles.checkbox}
        checked={isSelected(user.id)}
        onChange={() => toggleSelection(user.id)}
      />
      <img className={styles.avatar} src={user.avatar_url} alt={user.login} />
      <Typography variant="caption" className={styles.id}>{user.id}</Typography>
      <Typography variant="h2" className={styles.login}>{user.login}</Typography>
      <Button
        as="a"
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
