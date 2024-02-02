import { PUBLIC_API } from "@/lib/exports";
import { Tokens } from "@/lib/types";
import axios from "axios";
import { signIn, useSession } from "next-auth/react";
import { FormEvent, useRef, useState } from "react";
import { toast } from "react-toastify";
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
            toast.error('Passwords do not match', { theme: 'dark', autoClose: 2000 });
            return;
        }
        type RegisterForm = z.infer<typeof registerFormSchema>;
        const body = {
            username: usernameRef.current?.value,
            password: passwordRef.current?.value,
        } as RegisterForm;
        // try {
        //     registerFormSchema.parse(body);
        // }
        // catch (err) {
        //     setFirstFormState("error");
        //     toast.error("Invalid input", { theme: 'dark', autoClose: 2000 })
        //     return;
        // }
        try {
            let response = await PUBLIC_API.post('/auth/register/', body);
            if (response.status !== 200) {
                console.log(response.data);
                setFirstFormState("error");
                toast.error(response.data.error, { theme: 'dark', autoClose: 2000 });
                return;
            }
            setFirstFormState("success");
            signIn('credentials', { redirect: false, username: body.username, password: body.password });
            toast.success('Register Successful', { theme: 'dark', autoClose: 2000 });
            return;
        }
        catch (err: any) {
            setFirstFormState("error");
            toast.error(err.response.data.error, { theme: 'dark', autoClose: 2000 });
        }
    }
    return { usernameRef, passwordRef, secondPasswordRef, firstFormState, handleRegister, tokens };
}