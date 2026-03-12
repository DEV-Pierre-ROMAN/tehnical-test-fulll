import styles from "./Header.module.css";

export function Header() {
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>Github Search</h1>
    </header>
  );
}
