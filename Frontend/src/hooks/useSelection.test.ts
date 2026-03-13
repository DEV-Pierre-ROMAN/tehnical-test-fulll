import { act, renderHook } from "@testing-library/react";
import { useSelection } from "./useSelection";

describe("useSelection()", () => {
  it("initialize with empty selection", () => {
    const { result } = renderHook(() => useSelection());
    expect(result.current.selectedIds.size).toBe(0);
  });

  it("initialize with selection", () => {
    const { result } = renderHook(() => useSelection(["1", "2", "3"]));
    expect(result.current.selectedIds.size).toBe(3);
  });

  it("Edge case 1 : initialize with selection with two time same element", () => {
    const { result } = renderHook(() => useSelection(["1", "1", "2"]));
    expect(result.current.selectedIds.size).toBe(2);
  });

  it("isSelected on selected element", () => {
    const { result } = renderHook(() => useSelection(["1"]));
    expect(result.current.isSelected("1")).toBe(true);
  });

  it("isSelected on not selected element", () => {
    const { result } = renderHook(() => useSelection([]));
    expect(result.current.isSelected("1")).toBe(false);
  });

  it("toggles selection on unselected element", () => {
    const { result } = renderHook(() => useSelection());
    act(() => result.current.toggleSelection("1"));
    expect(result.current.selectedIds.has("1")).toBe(true);
  });

  it("toggles selection on selected element", () => {
    const { result } = renderHook(() => useSelection(["1"]));
    act(() => result.current.toggleSelection("1"));
    expect(result.current.selectedIds.has("1")).toBe(false);
  });

  it("selects many", () => {
    const { result } = renderHook(() => useSelection());
    act(() => result.current.selectMany(["1", "2", "3"]));
    expect(result.current.selectedIds.size).toBe(3);
  });

  it("Edge case 2 : selects many with already selected value", () => {
    const { result } = renderHook(() => useSelection(["1", "2", "3"]));
    act(() => result.current.selectMany(["1", "2", "4"]));
    expect(result.current.selectedIds.size).toBe(4);
  });

  it("unselects many", () => {
    const { result } = renderHook(() => useSelection(["1", "2", "3"]));
    act(() => result.current.unselectMany(["1", "2"]));
    expect(result.current.selectedIds.size).toBe(1);
  });

  it("unselects many with not selected value", () => {
    const { result } = renderHook(() => useSelection(["1", "2", "3"]));
    act(() => result.current.unselectMany(["4", "5"]));
    expect(result.current.selectedIds.size).toBe(3);
  });

  it("clears selection", () => {
    const { result } = renderHook(() => useSelection(["1", "2", "3"]));
    act(() => result.current.clearSelection());
    expect(result.current.selectedIds.size).toBe(0);
  });
});
