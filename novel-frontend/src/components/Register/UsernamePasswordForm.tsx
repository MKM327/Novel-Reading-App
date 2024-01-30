"use client";
import Button from "@/components/utils/ui/Button";
import Input from "@/components/utils/ui/Input";
import useHandleRegister from "@/hooks/register/useHandleRegister";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";
import useSWR from "swr";

export default function UsernamePasswordForm() {
  const {
    usernameRef,
    secondPasswordRef,
    loading,
    passwordRef,
    handleRegister,
  } = useHandleRegister();

  return (
    <form className="flex flex-col gap-3" onSubmit={handleRegister}>
      <h1>Create a new Account</h1>
      <div>
        <Input
          type="text"
          id="username"
          placeholder="Username"
          ref={usernameRef}
        />
      </div>
      <div className="flex gap-3 flex-wrap">
        <Input
          className="flex-1"
          type="password"
          id="password"
          placeholder="password"
          ref={passwordRef}
        />
        <Input
          className="flex-1"
          type="password"
          id="confirm-password"
          placeholder="Confirm password"
          ref={secondPasswordRef}
        />
      </div>
      <div className="flex justify-center items-center">
        <Button className="flex items-center gap-2">
          Continue
          <ClipLoader color="white" size={20} loading={loading} />
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
