import { showToast } from "@/components/utils/toast";
import { PUBLIC_API } from "@/lib/exports";
import { signIn } from "next-auth/react";
import { FormEvent, useRef, useState } from "react";
import { z } from "zod";
const registerFormSchema = z.object({
    username: z.string().min(3).max(20),
    password: z.string().refine(value => /^(?=.*[A-Z]).{6,}$/.test(value), {
        message: "Password must be at least 6 characters long and contain at least one uppercase letter",
    }),
});
export type FormState = "loading" | "error" | "success" | "idle";
export default function useHandleUsernamePassword() {
    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const secondPasswordRef = useRef<HTMLInputElement>(null);
    const [firstFormState, setFirstFormState] = useState<FormState>("idle");
    async function handleRegister(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setFirstFormState("loading");
        if (passwordRef.current?.value !== secondPasswordRef.current?.value) {
            setFirstFormState("error");
            showToast("Passwords do not match", "error");
            return;
        }
        type RegisterForm = z.infer<typeof registerFormSchema>;
        const body = {
            username: usernameRef.current?.value,
            password: passwordRef.current?.value,
        } as RegisterForm;
        try {
            registerFormSchema.parse(body);
        }
        catch (err: any) {
            setFirstFormState("error");
            const errorMessage = err.errors[0].message;
            showToast(errorMessage, "error");
            return;
        }
        try {
            let response = await PUBLIC_API.post('/auth/register/', body);
            if (response.status !== 200) {
                setFirstFormState("error");
                showToast(response.data.error, "error");
                return;
            }
            setFirstFormState("success");
            signIn('credentials', { redirect: false, username: body.username, password: body.password });
            showToast("Account created successfully", "success");
        }
        catch (err: any) {
            setFirstFormState("error");
            showToast(err.response.data.error, "error");
        }
    }
    return { usernameRef, passwordRef, secondPasswordRef, firstFormState, handleRegister };
}