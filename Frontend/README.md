# GitHub User Search

[![CI](https://github.com/DEV-Pierre-ROMAN/tehnical-test-fulll/actions/workflows/ci.yml/badge.svg)](https://github.com/DEV-Pierre-ROMAN/tehnical-test-fulll/actions/workflows/ci.yml)

> **[Version francaise](README.fr.md)**

A React application for searching and managing GitHub users.

## Approach and technical choices

### TDD and business logic / display separation

Development started with a TDD approach on the business logic (hooks). The goal was to clearly separate business logic from display: hooks contain all the application intelligence and are unit-tested in isolation, while React components are only responsible for rendering.

### Continuous integration

A CI pipeline was set up to run tests automatically on every push, ensuring non-regression of the business logic throughout development.

### Hooks

- **`useFetch`**: Generic data fetching hook, a lightweight alternative to TanStack Query's `useQuery` in a context without external libraries. It includes a caching system to avoid redundant requests and uses an `AbortController` to automatically cancel ongoing requests when a new one is triggered, following modern fetching best practices.

- **`useUserSearch`**: Specialization of `useFetch` dedicated to GitHub user search. This hook interfaces with a specific error handler that manages GitHub API errors (rate limiting, unexpected responses, etc.). It also transforms raw API responses into `User` business objects via a mapper, decoupling the external model from the internal one. The hook is designed to be extensible through an options system, intended to accommodate future features such as pagination.

- **`useUserList`**: Local user list management (add, remove, duplicate).

- **`useSelection`**: User selection management within the list. Uses a `Set` to natively handle ID duplicates without additional logic.

- **`useUserManager`**: Composition hook that binds `useUserList` and `useSelection` into a unified interface. It also handles synchronization between the external source (search results) and local state, following the React-recommended approach: updating state via a condition during render rather than a `useEffect`, thus avoiding an unnecessary extra render cycle.

- **`useDebounce`**: Classic debounce applied to search input, triggering the request only after an inactivity delay. This avoids hitting the API on every keystroke and provides a smooth experience without the need for a submit button.

- **`useTheme`**: Light/dark mode management. Detects system preference, persists the choice in `localStorage`, and applies the theme via a `data-theme` attribute on the DOM.

- **`useDelayedUnmount`**: Delays component unmounting to allow exit animations to play. Enables smooth transitions (fade out, slide up) before React removes the element from the DOM.

### Contexts

Without access to state management libraries like Zustand, shared state management relies on React's native `useContext` API.

- **`SelectionContext`**: Provides selection-related functions and state (toggle, check, clear) to the entire component tree, avoiding props drilling.

- **`EditModeContext`**: Separate context managing the edit mode state (on/off). It is intentionally decoupled from `SelectionContext` since edit mode could eventually extend beyond user selection.

### Styles and UI components

Without access to Tailwind and shadcn/ui, styling relies on **CSS Modules**: a lightweight approach well-suited to the project's size, ensuring style scoping and clear separation per component.

A small library of **reusable UI components** (`Button`, `CheckBox`, `Toggle`, `Typography`, `Icon`) was built, inspired by shadcn/ui and Radix UI. These components contain no business logic and expose a system of pre-built **variants**, enabling declarative and consistent usage across the application.

Icons come from **Lucide Icons**, imported as SVG files and rendered inline via Vite `?raw` imports, allowing them to be natively styled with `currentColor` and ensuring dark mode compatibility.
