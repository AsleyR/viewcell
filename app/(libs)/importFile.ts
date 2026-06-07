// lib/importFile.ts
import * as XLSX from "xlsx";
export const importFile = (file: File): Promise<any[][]> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("File read error"));
    reader.onload = (e) => {
      try {
        const result = e.target?.result;
        if (!result) return resolve([]);
        if (file.name.toLowerCase().endsWith(".csv")) {
          // CSV comes as text
          const text = result as string;
          const workbook = XLSX.read(text, { type: "string", raw: false });
          const ws = workbook.Sheets[workbook.SheetNames[0]];
          const json = (XLSX.utils.sheet_to_json(ws, { header: 1 }) as any[][]) || [];
          const formatted = json.map((row) => row.map((cell) => ({ value: cell ?? "" })));
          return resolve(formatted);
        } else {
          // XLSX/XLS: read as ArrayBuffer
          const arrayBuffer = result as ArrayBuffer;
          const wb = XLSX.read(arrayBuffer, { type: "array" });
          const ws = wb.Sheets[wb.SheetNames[0]];
          const json = (XLSX.utils.sheet_to_json(ws, { header: 1 }) as any[][]) || [];
          const formatted = json.map((row) => row.map((cell) => ({ value: cell ?? "" })));
          return resolve(formatted);
        }
      } catch (err) {
        reject(err);
      }
    };

    // For CSV we need text; for xlsx we need array buffer
    if (file.name.toLowerCase().endsWith(".csv")) reader.readAsText(file);
    else reader.readAsArrayBuffer(file);
  });
