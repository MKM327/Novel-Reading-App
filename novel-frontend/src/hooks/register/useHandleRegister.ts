import { PUBLIC_API } from "@/lib/exports";
import { FormEvent, useRef, useState } from "react";
import { toast } from "react-toastify";
import useSWR, { useSWRConfig } from "swr";
import { z } from "zod";
const registerFormSchema = z.object({
    username: z.string().min(3).max(20),
    password: z.string().refine(value => /^(?=.*[A-Z]).{6,}$/.test(value), {
        message: "Password must be at least 6 characters long and contain at least one uppercase letter",
    }),
});
export default function useHandleRegister() {
    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const secondPasswordRef = useRef<HTMLInputElement>(null);
    const [loading, setLoading] = useState(false);
    async function handleRegister(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);
        if (passwordRef.current?.value !== secondPasswordRef.current?.value) {
            setLoading(false);
            toast.error('Passwords do not match', { theme: 'dark', autoClose: 2000 });
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
        catch (err) {
            setLoading(false);
            toast.error("Invalid input", { theme: 'dark', autoClose: 2000 })
            return;
        }
        try {
            let response = await PUBLIC_API.post('/auth/register/', body);
            console.log(response.data);
            if (response.status !== 200) {
                console.log(response.data);
                setLoading(false);
                toast.error(response.data.error, { theme: 'dark', autoClose: 2000 });
                return;
            }
            setLoading(false);
            toast.success('Register Successful', { theme: 'dark', autoClose: 2000 });
            return;
        }
        catch (err: any) {
            setLoading(false);
            toast.error(err.response.data.error, { theme: 'dark', autoClose: 2000 });
        }
    }
    return { usernameRef, passwordRef, secondPasswordRef, loading, handleRegister };
}