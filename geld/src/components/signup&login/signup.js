"use client";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "../provider/AuthProvider";
import { useState } from "react";

export default function Login() {
  const { signIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <section className="w-[384px] h-fit flex flex-col gap-[40px]">
      <div className="w-fit h-fit m-auto ">
        <Image
          src="/logo_geld.png"
          alt="Picture of the author"
          width={92}
          height={34}
        ></Image>
      </div>
      <div className="m-auto w-full h-fit flex flex-col gap-[8px] items-center">
        <h1 className="text-[#0F172A] font-[600] text-[24px]">Welcome Back</h1>
        <p>Welcome back, Please enter your details</p>
      </div>
      <div className="w-full h-fit flex flex-col gap-[16px]">
        <input
          type="text"
          placeholder="Email"
          className="w-full h-[48px] rounded-lg bg-[#F3F4F6] px-[16px] py-[12px] "
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        ></input>
        <input
          type="text"
          placeholder="Password"
          className="w-full h-[48px] rounded-lg bg-[#F3F4F6] px-[16px] py-[12px] "
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        ></input>
        <input
          type="submit"
          value="Login"
          className="w-full h-[48px] rounded-[20px] bg-[#0166FF] text-white"
          onClick={() => {
            signIn(email, password);
          }}
        ></input>
      </div>
      <div className="w-full h-fit text-center">
        Don&apos;t have account? <Link href="/signup">Signup</Link>
      </div>
    </section>
  );
}
