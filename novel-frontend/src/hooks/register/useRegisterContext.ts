import { registerContext } from "@/contexts/registerContext";
import { useContext } from "react";

export default function useRegisterContext() {
    const context = useContext(registerContext);
    if (!context) throw new Error("useRegisterContext must be used within a RegisterProvider");
    return context;
}