"use client";
import Button from "@/components/utils/ui/Button";
import Input from "@/components/utils/ui/Input";
import useRegisterContext from "@/hooks/register/useRegisterContext";
import { ClipLoader } from "react-spinners";

export default function PersonalDetailsForm() {
  const {
    secondFormState,
    handlePersonalDetails,
    firstNameRef,
    lastNameRef,
    emailRef,
  } = useRegisterContext();
  return (
    <form className="flex flex-col gap-3" onSubmit={handlePersonalDetails}>
      <h1>Enter Some Personal Details</h1>
      <div>
        <Input type="email" id="Email" placeholder="Email" ref={emailRef} />
      </div>
      <div className="flex gap-3 flex-wrap">
        <Input
          className="flex-1"
          type="firstName"
          id="firstName"
          placeholder="First Name"
          ref={firstNameRef}
        />
        <Input
          className="flex-1"
          type="lastName"
          id="lastName"
          placeholder="Last Name"
          ref={lastNameRef}
        />
      </div>
      <div className="flex justify-center items-center ">
        <Button className="flex items-center gap-2">
          Sign Up
          <ClipLoader
            color="white"
            size={20}
            loading={secondFormState == "loading"}
          />
        </Button>
      </div>
      <div className="relative flex items-center justify-center">
        <hr className=" absolute bg-white  w-full" />
        <div className="bg-gray-900 z-10 px-2">
          <span className=" ">OR</span>
        </div>
      </div>
      <div className="flex justify-center">
        <Button>Continue with Google</Button>
      </div>
    </form>
  );
}
