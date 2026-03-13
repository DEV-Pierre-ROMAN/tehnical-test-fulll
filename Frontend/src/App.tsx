import { useState } from "react";
import styles from "./App.module.css";
import { SelectionProvider } from "./contexts/SelectionContext/SelectionProvider";
import { EditModeProvider } from "./contexts/EditModeContext/EditModeProvider";
import { useUserSearch } from "./hooks/useUserSearch";
import { useUserManager } from "./hooks/useUserManager";
import { Header } from "./components/Header";
import { SearchBar } from "./components/SearchBar";
import { ActionBar } from "./components/ActionBar";
import { ResultList } from "./components/ResultList";
import { useDebounce } from "./hooks/useDebounce";
import { useEditModeContext } from "./contexts/EditModeContext/useEditModeContext";
import { useDelayedUnmount } from "./hooks/useDelayedUnmount";
import actionBarStyles from "./components/ActionBar.module.css";

function AppContent() {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 300);
  const { isEditMode } = useEditModeContext();
  const { mounted: actionBarMounted, visible: actionBarVisible } = useDelayedUnmount(isEditMode, 250);

  const { data, loading, error } = useUserSearch(debouncedQuery, {});
  const {
    users,
    selectedIds,
    isSelected,
    toggleSelection,
    selectMany,
    unselectMany,
    clearSelection,
    deleteSelected,
    duplicateSelected,
  } = useUserManager(data ?? []);

  return (
    <SelectionProvider
      value={{
        selectedIds,
        isSelected,
        toggleSelection,
        selectMany,
        unselectMany,
        clearSelection,
      }}
    >
      <div className={styles.layout}>
        <Header />
        <div className={styles.searchbarWrapper}>
          <SearchBar value={query} onChange={setQuery} />
        </div>

        {actionBarMounted && (
          <ActionBar
            className={actionBarVisible ? actionBarStyles.entering : actionBarStyles.exiting}
            onClearSelection={clearSelection}
            selectedCount={selectedIds.size}
            totalCount={users.length}
            onDuplicate={duplicateSelected}
            onSelectAll={() => selectMany(users.map((u) => u.id))}
            onDelete={deleteSelected}
          />
        )}
        <div className={styles.resultWrapper}>
          <ResultList users={users} loading={loading} error={error} />
        </div>
      </div>
    </SelectionProvider>
  );
}

function App() {
  return (
    <EditModeProvider>
      <AppContent />
    </EditModeProvider>
  );
}

export default App;
