import styles from "./ActionBar.module.css";
import trashIcon from "../assets/icons/trash-2.svg";
import copyIcon from "../assets/icons/copy.svg";
import { CheckBox } from "./ui/CheckBox";
import { Button } from "./ui/Button";

type ActionBarProps = {
  selectedCount: number;
  totalCount: number;
  onDuplicate: () => void;
  onDelete: () => void;
  onSelectAll: () => void;
  onClearSelection: () => void;
};

type SelectAllCheckboxLabelProps = {
  selectedCount: number;
  totalCount: number;
  onClearSelection: () => void;
  onSelectAll: () => void;
};

function SelectAllCheckboxLabel({
  selectedCount,
  totalCount,
  onClearSelection,
  onSelectAll,
}: SelectAllCheckboxLabelProps) {
  const allSelected = selectedCount === totalCount && totalCount > 0;
  let labelText;
  if (selectedCount > 0) {
    labelText = (
      <>
        {selectedCount} element{selectedCount > 1 && "s"} selected
        {!allSelected && (
          <>
            {" "}
            -{" "}
            <Button
              variant="link"
              onClick={(event) => {
                onSelectAll();
                event.preventDefault();
              }}
            >
              Select all
            </Button>
          </>
        )}
      </>
    );
  } else {
    labelText = (
      <>
        Select all ({totalCount} element{totalCount > 1 && "s"})
      </>
    );
  }

  return (
    <span className={styles.counter}>
      <CheckBox
        id="selectAllCheckBox"
        variant={allSelected ? "default" : "minus"}
        checked={selectedCount > 0}
        onChange={() =>
          selectedCount > 0 ? onClearSelection() : onSelectAll()
        }
      />
      <label htmlFor="selectAllCheckBox">{labelText}</label>
    </span>
  );
}

export function ActionBar({
  selectedCount,
  totalCount,
  onDuplicate,
  onDelete,
  onSelectAll,
  onClearSelection,
}: ActionBarProps) {
  const hasSelection = selectedCount > 0;

  return (
    <div className={styles.container}>
      <SelectAllCheckboxLabel
        selectedCount={selectedCount}
        totalCount={totalCount}
        onSelectAll={onSelectAll}
        onClearSelection={onClearSelection}
      />
      <div className={styles.actions}>
        <Button
          variant="ghost"
          className={styles.button}
          onClick={onDuplicate}
          disabled={!hasSelection}
        >
          <img src={copyIcon} alt="" width="20" height="20" />
        </Button>
        <Button
          variant="ghost"
          className={styles.button}
          onClick={onDelete}
          disabled={!hasSelection}
        >
          <img src={trashIcon} alt="" width="20" height="20" />
        </Button>
      </div>
    </div>
  );
}
