import { useRef, useState } from "react";
import { FormState } from "./useHandleUsernamePassword";
import { toast } from "react-toastify";
import axios from "axios";
import { BASE_URL, useGetClientAPI } from "@/lib/exports";

export default function useHandlePersonalDetails() {
    const emailRef = useRef<HTMLInputElement>(null);
    const firstNameRef = useRef<HTMLInputElement>(null);
    const lastNameRef = useRef<HTMLInputElement>(null);
    const [secondFormState, setSecondFormState] = useState<FormState>("idle");
    let api = useGetClientAPI();
    const handlePersonalDetails = async (e: React.FormEvent<HTMLFormElement>) => {
        setSecondFormState("loading");
        e.preventDefault();
        const email = emailRef.current?.value;
        const firstName = firstNameRef.current?.value;
        const lastName = lastNameRef.current?.value;
        if (!email || !firstName || !lastName) {
            setSecondFormState("error");
            toast.error("Please fill in all fields");
            return;
        }
        try {
            let response = await api.post("/auth/register/", { email, first_name: firstName, last_name: lastName });
            if (response.status !== 200) {
                setSecondFormState("error");
                toast.error("Something went wrong");
                return;
            }
            setSecondFormState("success");
            toast.success("Your account has been created you can log in now");
        } catch (e: any) {
            setSecondFormState("error");
            console.log(e)
        }
    }
    return { firstNameRef, lastNameRef, emailRef, handlePersonalDetails, secondFormState }
}