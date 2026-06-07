export const padSheet = (sheet: any[][], minRows = 20, minCols = 10) => {
  const rows = Math.max(minRows, sheet.length);
  const cols = Math.max(
    minCols,
    sheet.reduce((m, r) => Math.max(m, r?.length ?? 0), 0)
  );

  const out: any[][] = new Array(rows);
  for (let r = 0; r < rows; r++) {
    const srcRow = sheet[r] ?? [];
    const newRow: any[] = new Array(cols);
    for (let c = 0; c < cols; c++) {
      const cell = srcRow[c];
      // keep existing cell objects or convert primitive -> { value }
      newRow[c] = cell == null ? { value: "" } : (typeof cell === "object" ? cell : { value: cell });
    }
    out[r] = newRow;
  }
  return out;
};
