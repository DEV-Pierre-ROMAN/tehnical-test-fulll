import { useSelectionContext } from "../contexts/SelectionContext/useSelectionContext";
import type { User } from "../types";
import styles from "./ResultUserItem.module.css";
import { CheckBox } from "./ui/CheckBox";

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
      <p className={styles.id}>{user.id}</p>
      <p className={styles.login}>{user.login}</p>
      <a
        className={styles.profileLink}
        href={user.url}
        target="_blank"
        rel="noopener noreferrer"
      >
        View profile
      </a>
    </div>
  );
}
