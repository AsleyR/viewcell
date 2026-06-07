"use client"

import { useRef, useState } from "react";
import { useSheetData } from "../(context)/SheetDataContext";

import { padSheet } from "../(libs)/padSheet";
import { importFile } from "../(libs)/importFile";

export default function NavbarUploadFileBtn() {
    const { setData, sheetRef, isFileLoaded, setIsFileLoaded } = useSheetData();
    const fileRef = useRef<HTMLInputElement | null>(null);
    const [loading, setLoading] = useState(false);

    const onPick = () => fileRef.current?.click();

    const newFile = () => {
        const padded = padSheet([[]], 20, 10);
        setData(padded)
        sheetRef.current.setData(padded);

        setIsFileLoaded(false)
    }

    const onFileChange: React.ChangeEventHandler<HTMLInputElement> = async (e) => {
    const file = e.target.files?.[0];
    e.currentTarget.value = "";
    if (!file) return;
    setLoading(true);
    
    if (!isFileLoaded) {
        setIsFileLoaded(true)
    }

    try {
        const parsed = await importFile(file);
        const padded = padSheet(parsed, 20, 10);
        // update context state
        setData(padded);
        // imperative update to the Sheet component if available
        if (sheetRef?.current?.setData) {
            sheetRef.current.setData(padded);
        }
    } catch (err) {
        console.error("Import failed", err);
    } finally {
        setLoading(false);
    }
    };

    return(
        <li>
            {
                isFileLoaded ?
                <button className="cursor-pointer hover:bg-black/10 py-2 px-3 rounded-sm" onClick={newFile}>
                    New File
                </button> : <></>
            }
            <button className="cursor-pointer hover:bg-black/10 py-2 px-3 rounded-sm" onClick={onPick}>
                Open File
            </button>
            <input
                ref={fileRef}
                type="file"
                accept=".xlsx,.xls,.csv"
                onChange={onFileChange}
                style={{ display: "none" }}
            />
        </li>
    )
}