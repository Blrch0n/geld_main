"use client";
import Header from "@/components/all/header";
import Card1 from "@/components/dashboard/extra/card1";
import Card2 from "@/components/dashboard/extra/card2";
import Card3 from "@/components/dashboard/extra/card3";
import IncomeExpense1 from "@/components/dashboard/extra/income_expense";
import IncomeExpense2 from "@/components/dashboard/extra/income_expense2";
import LastRecords from "@/components/dashboard/extra/last_records";
import { useAuth } from "@/components/provider/AuthProvider";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    if (!isLoggedIn) router.push("/");
  }, [isLoggedIn]);

  if (!isLoggedIn) return null;
  return (
    <section className="w-full h-screen flex flex-col gap-[32px] bg-[#F3F4F6] relative">
      <Header></Header>
      <div className="flex flex-col h-full gap-[24px] w-[1200px] m-auto">
        <div className="flex flex-row gap-[24px] w-full h-fit">
          <Card1></Card1>
          <Card2></Card2>
          <Card3></Card3>
        </div>
        <div className="flex flex-row gap-[24px] w-full h-fit">
          <IncomeExpense1></IncomeExpense1>
          <IncomeExpense2></IncomeExpense2>
        </div>
        <div className="w-full h-full">
          <LastRecords></LastRecords>
        </div>
      </div>
    </section>
  );
}
