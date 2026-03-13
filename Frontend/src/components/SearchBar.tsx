import styles from "./SearchBar.module.css";

type SearchBarProps = {
  value: string;
  onChange: (value: string) => void;
};

export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <input
      type="search"
      value={value}
      className={styles.input}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Search users..."
    />
  );
}
