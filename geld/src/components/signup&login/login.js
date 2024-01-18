"use client";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "../provider/AuthProvider";
import { useState } from "react";

export default function SignUp() {
  const { signUp } = useAuth();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  return (
    <form className="w-[384px] h-fit flex flex-col gap-[40px]">
      <div className="w-fit h-fit m-auto ">
        <img src="/public/logo_geld.png" className="w-[92px] h-[34px]"></img>
      </div>
      <div className="m-auto w-full h-fit flex flex-col gap-[8px] items-center">
        <h1 className="text-[#0F172A] font-[600] text-[24px]">
          Create Geld account
        </h1>
        <p>Sign up below to create your Wallet account</p>
      </div>
      <div className="w-full h-fit flex flex-col gap-[16px]">
        <input
          type="text"
          placeholder="Name"
          className="w-full h-[48px] rounded-lg bg-[#F3F4F6] px-[16px] py-[12px] "
          onChange={(e) => {
            setName(e.target.value);
          }}
        ></input>
        <input
          type="text"
          placeholder="Email"
          className="w-full h-[48px] rounded-lg bg-[#F3F4F6] px-[16px] py-[12px] "
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        ></input>
        <input
          type="password"
          placeholder="Password"
          className="w-full h-[48px] rounded-lg bg-[#F3F4F6] px-[16px] py-[12px] "
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        ></input>
        <input
          type="password"
          placeholder="Password"
          className="w-full h-[48px] rounded-lg bg-[#F3F4F6] px-[16px] py-[12px] "
        ></input>
        <input
          type="submit"
          value="Sign up"
          className="w-full h-[48px] rounded-[20px] bg-[#0166FF] text-white"
          onClick={(e) => {
            e.preventDefault();
            signUp(name, email, password);
          }}
        ></input>
      </div>
      <div className="w-full h-fit text-center">
        Don&apos;t have account? <Link href="/">Login</Link>
      </div>
    </form>
  );
}
