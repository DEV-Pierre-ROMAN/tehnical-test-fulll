import { useState } from "react";
import styles from "./App.module.css";
import { SelectionProvider } from "./contexts/SelectionContext/SelectionProvider";
import { useUserSearch } from "./hooks/useUserSearch";
import { useUserManager } from "./hooks/useUserManager";
import { Header } from "./components/Header";
import { SearchBar } from "./components/SearchBar";
import { ActionBar } from "./components/ActionBar";
import { ResultList } from "./components/ResultList";
import { useDebounce } from "./hooks/useDebounce";

function App() {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 300);

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

        <ActionBar
          onClearSelection={clearSelection}
          selectedCount={selectedIds.size}
          totalCount={users.length}
          onDuplicate={duplicateSelected}
          onSelectAll={() => selectMany(users.map((u) => u.id))}
          onDelete={deleteSelected}
        />
        <div className={styles.resultWrapper}>
          <ResultList users={users} loading={loading} error={error} />
        </div>
      </div>
    </SelectionProvider>
  );
}

export default App;
