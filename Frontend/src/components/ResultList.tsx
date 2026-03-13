import type { User } from "../types";
import { ResultItem } from "./ResultUserItem";
import styles from "./ResultList.module.css";
import { Typography } from "./ui/Typography";

type ResultListProps = {
  users: User[];
  loading: boolean;
  error: Error | null;
};

export function ResultList({ users, loading, error }: ResultListProps) {
  if (loading) return <Typography variant="muted" className={styles.message}>Loading...</Typography>;
  if (error) return <Typography variant="muted" className={styles.message}>{error.message}</Typography>;
  if (users.length === 0) return <Typography variant="muted" className={styles.message}>No results</Typography>;

  return (
    <div className={styles.container}>
      <div className={styles.grid}>
        {users.map((user) => (
          <ResultItem key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
}
