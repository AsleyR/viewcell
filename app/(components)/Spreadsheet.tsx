"use client"

import Sheet from "react-spread-sheet-excel";
import { useSheetData } from "../(context)/SheetDataContext";

export default function SheetArea() {
  const { data, setData, sheetRef } = useSheetData();

  const handleChange = (row?: number, col?: number, value?: string) => {
    if (row == null || col == null) return;
    const next = data.map(r => r.map(c => ({ ...c })));
    while (next.length <= row) next.push([]);
    while (next[row].length <= col) next[row].push({ value: "" });
    next[row][col].value = value ?? "";
    setData(next);
  };

  return (
    <div className="sheet-scope">
      <Sheet data={data} onChange={handleChange} ref={sheetRef} />
    </div>
  );
}