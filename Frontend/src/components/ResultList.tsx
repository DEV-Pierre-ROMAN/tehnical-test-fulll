import type { User } from "../types";
import { ResultItem } from "./ResultUserItem";
import styles from "./ResultList.module.css";

type ResultListProps = {
  users: User[];
  loading: boolean;
  error: Error | null;
};

export function ResultList({ users, loading, error }: ResultListProps) {
  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;
  if (users.length === 0) return <p>No results</p>;

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
