"use client"

import React, { createContext, useContext, useState, useRef } from "react";
// import type { SheetRef } from "react-spread-sheet-excel";
import { padSheet } from "../(libs)/padSheet";

export type Cell = { value: string | number | null };
export type Row = Cell[];
export type SheetData = Row[];

type Ctx = {
  data: SheetData;
  setData: (d: SheetData) => void;
  sheetRef: React.RefObject<any>;
  isFileLoaded: boolean;
  setIsFileLoaded: (v: boolean) => void
};

const defaultData: SheetData = padSheet([[]], 20, 10);

const SheetDataContext = createContext<Ctx | undefined>(undefined);

export const SheetDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<SheetData>(defaultData);
  const [isFileLoaded, setIsFileLoaded] = useState(false)
  const sheetRef = useRef<any>(null);
  return <SheetDataContext.Provider value={{ data, setData, sheetRef, isFileLoaded, setIsFileLoaded }}>{children}</SheetDataContext.Provider>;
};

export const useSheetData = () => {
  const ctx = useContext(SheetDataContext);
  if (!ctx) throw new Error("useSheetData must be used within SheetDataProvider");
  return ctx;
};