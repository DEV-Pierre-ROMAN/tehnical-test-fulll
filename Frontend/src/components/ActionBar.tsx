import styles from "./ActionBar.module.css";
import trashIcon from "../assets/icons/trash-2.svg";
import copyIcon from "../assets/icons/copy.svg";
import minusIcon from "../assets/icons/square-minus.svg";

type ActionBarProps = {
  selectedCount: number;
  onDuplicate: () => void;
  onDelete: () => void;
  onClearSelection: () => void;
};

export function ActionBar({
  selectedCount,
  onDuplicate,
  onDelete,
  onClearSelection,
}: ActionBarProps) {
  const hasSelection = selectedCount > 0;

  return (
    <div className={styles.container}>
      <span className={styles.counter}>
        <button
          className={styles.button}
          onClick={onClearSelection}
          disabled={!hasSelection}
        >
          <img src={minusIcon} alt="" width="20" height="20" />
        </button>
        {selectedCount} elements selected
      </span>
      <div className={styles.actions}>
        <button
          className={styles.button}
          onClick={onDuplicate}
          disabled={!hasSelection}
        >
          <img src={copyIcon} alt="" width="20" height="20" />
        </button>
        <button
          className={styles.button}
          onClick={onDelete}
          disabled={!hasSelection}
        >
          <img src={trashIcon} alt="" width="20" height="20" />
        </button>
      </div>
    </div>
  );
}
