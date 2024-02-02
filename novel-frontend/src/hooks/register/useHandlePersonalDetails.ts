import { useRef, useState } from "react";
import { FormState } from "./useHandleUsernamePassword";
import { toast } from "react-toastify";
import axios from "axios";
import { BASE_URL, useGetClientAPI } from "@/lib/exports";
import { useSession } from "next-auth/react";

export default function useHandlePersonalDetails() {
    const emailRef = useRef<HTMLInputElement>(null);
    const firstNameRef = useRef<HTMLInputElement>(null);
    const lastNameRef = useRef<HTMLInputElement>(null);
    const [secondFormState, setSecondFormState] = useState<FormState>("idle");
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
            toast.error("Please fill in all fields");
            return;
        }
        try {
            let response = await api.post("auth/details/", { email, first_name: firstName, last_name: lastName })
            if (response.status !== 200) {
                setSecondFormState("error");
                toast.error("Something went wrong You can change this later from your profile page");
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