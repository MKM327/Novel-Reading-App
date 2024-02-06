import { ToastOptions, toast } from "react-toastify";
type ToastType = "success" | "error" | "info" | "warning";
export const showToast = (text: string, type: ToastType, options?: Partial<ToastOptions>) => {

    const toastFn = type === "success" ? toast.success : toast.error;
    const toastOptions: ToastOptions = {
        theme: "dark",
        autoClose: 2000,
    }
    toastFn(text, {
        ...toastOptions,
        ...options,
    });
}