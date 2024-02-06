import { useRef, useState } from "react";
import { FormState } from "./useHandleUsernamePassword";
import { useGetClientAPI } from "@/lib/exports";
import { useSession } from "next-auth/react";
import { showToast } from "@/components/utils/toast";
import { useRouter } from "next/navigation";

export default function useHandlePersonalDetails() {
    const emailRef = useRef<HTMLInputElement>(null);
    const firstNameRef = useRef<HTMLInputElement>(null);
    const lastNameRef = useRef<HTMLInputElement>(null);
    const [secondFormState, setSecondFormState] = useState<FormState>("idle");
    const router = useRouter();
    let api = useGetClientAPI();
    const { data } = useSession();
    const handlePersonalDetails = async (e: React.FormEvent<HTMLFormElement>) => {
        console.log("session", data);
        setSecondFormState("loading");
        e.preventDefault();
        const email = emailRef.current?.value;
        const firstName = firstNameRef.current?.value;
        const lastName = lastNameRef.current?.value;
        if (!email || !firstName || !lastName) {
            setSecondFormState("error");
            showToast("Please fill in all the details", "error");
            return;
        }
        try {
            let response = await api.post("auth/details/", { email, first_name: firstName, last_name: lastName })
            if (response.status !== 200) {
                setSecondFormState("error");
                showToast("Something went wrong", "error");
                return;
            }
            setSecondFormState("success");
            showToast("Your account has been created. Redirecting...", "success");
            setTimeout(() => {
                router.push("/");
            }, 2000);
        }
        catch (e: any) {
            setSecondFormState("error");
            console.log(e)
        }
    }
    return { firstNameRef, lastNameRef, emailRef, handlePersonalDetails, secondFormState }
}