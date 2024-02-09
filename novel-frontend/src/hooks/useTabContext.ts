import { tabContext } from "@/contexts/TabContext";
import { useContext } from "react";

export function useTabContext() {
    const context = useContext(tabContext);
    if (!context) {
        throw new Error("useTabContext must be used within a TabsProvider")
    }
    return context;
}