"use client";
import PersonalDetailsForm from "./PersonalDetailsForm";
import UsernamePasswordForm from "./UsernamePasswordForm";
import { RegisterProvider } from "@/contexts/registerContext";
import useRegisterContext from "@/hooks/register/useRegisterContext";
import { FormState } from "@/hooks/register/useHandleUsernamePassword";
import { SessionProvider } from "next-auth/react";
function getCurrentForm(state: FormState) {
  return state == "success" ? "personal-details" : "username-password";
}
function RegisterHandler() {
  const { firstFormState } = useRegisterContext();
  const registerState = getCurrentForm(firstFormState);
  return (
    <div className="bg-gray-900 p-3 rounded-lg">
      {registerState === "username-password" && <UsernamePasswordForm />}
      {registerState === "personal-details" && <PersonalDetailsForm />}
    </div>
  );
}
export default function Register() {
  return (
    <SessionProvider>
      <RegisterProvider>
        <RegisterHandler />
      </RegisterProvider>
    </SessionProvider>
  );
}
