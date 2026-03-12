import type { User } from "../types";
import styles from "./ResultUserItem.module.css";

type ResultItemProps = {
  user: User;
  isSelected: boolean;
  onToggle: (id: string) => void;
};

export function ResultItem({ user, onToggle, isSelected }: ResultItemProps) {
  return (
    <div className={styles.card}>
      <input
        className={styles.checkbox}
        type="checkbox"
        checked={isSelected}
        onChange={() => onToggle(user.id)}
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
