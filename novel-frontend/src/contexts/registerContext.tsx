import useHandlePersonalDetails from "@/hooks/register/useHandlePersonalDetails";
import useHandleUsernamePassword from "@/hooks/register/useHandleUsernamePassword";
import { Tokens } from "@/lib/types";
import { PropsWithChildren, createContext } from "react";

interface ContextProps {
  usernameRef: React.RefObject<HTMLInputElement>;
  secondPasswordRef: React.RefObject<HTMLInputElement>;
  firstFormState: "idle" | "loading" | "error" | "success";
  passwordRef: React.RefObject<HTMLInputElement>;
  handleRegister: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  tokens: Tokens | null;
  handlePersonalDetails: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  secondFormState: "idle" | "loading" | "error" | "success";
  emailRef: React.RefObject<HTMLInputElement>;
  firstNameRef: React.RefObject<HTMLInputElement>;
  lastNameRef: React.RefObject<HTMLInputElement>;
}
const registerContext = createContext<ContextProps | null>(null);

function RegisterProvider({ children }: PropsWithChildren) {
  const {
    usernameRef,
    secondPasswordRef,
    firstFormState,
    passwordRef,
    handleRegister,
    tokens,
  } = useHandleUsernamePassword();
  const {
    handlePersonalDetails,
    secondFormState,
    emailRef,
    firstNameRef,
    lastNameRef,
  } = useHandlePersonalDetails();
  return (
    <registerContext.Provider
      value={{
        usernameRef,
        secondPasswordRef,
        firstFormState,
        passwordRef,
        handleRegister,
        tokens,
        handlePersonalDetails,
        secondFormState,
        emailRef,
        firstNameRef,
        lastNameRef,
      }}
    >
      {children}
    </registerContext.Provider>
  );
}
export { registerContext, RegisterProvider };
