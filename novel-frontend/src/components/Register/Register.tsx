"use client";
import { SWRConfig } from "swr";
import PersonalDetailsForm from "./PersonalDetailsForm";
import UsernamePasswordForm from "./UsernamePasswordForm";
import axios from "axios";

const fetcher = ({ url, body }: any) => {
  console.log(url);
  return axios.post(url, body, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};
export default function Register() {
  return (
    <SWRConfig value={{ fetcher: (data) => fetcher(data) }}>
      <div className="bg-gray-900 p-3 rounded-lg">
        <UsernamePasswordForm />
        {/* <PersonalDetailsForm /> */}
      </div>
    </SWRConfig>
  );
}
