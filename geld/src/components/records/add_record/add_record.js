"use client";
import { Context } from "@/app/layout";
import Image from "next/image";
import { useContext, useState } from "react";
import ShowCategoryOfAddRecord from "./show_category";
import { useAuth } from "@/components/provider/AuthProvider";
import * as icons from "react-icons/gr";

export default function AddRecord() {
  const [amount, setAmount] = useState("");
  const [isExpense, setIsExpense] = useState(true);
  const { setIsOpenRecord, IconColor, selectedIcon } = useContext(Context);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const { addRecord_ } = useAuth();
  const [openCategory, setOpenCategory] = useState(false);
  const [selectedIconRecord, setSelectedIconRecord] =
    useState("GrAccessibility");
  const [RecordColor, setRecordColor] = useState("#FF7B01");
  const [selectedCategory, setSelectedCategory] = useState();
  const Icon = icons[selectedIconRecord];
  return (
    <section className="w-full h-screen absolute flex items-center justify-center bg-[#00000080]">
      <div className="w-[792px] h-[512px] bg-white  rounded-[12px] flex-col flex">
        <header className="w-full h-[68px] flex items-center px-[20px] justify-between">
          <h1 className="text-[20px] font-[600]">Add Record</h1>
          <Image
            src="/esc.svg"
            width={24}
            alt="Picture of the author"
            height={24}
            onClick={() => {
              setIsOpenRecord(false);
            }}
          ></Image>
        </header>
        <main className="flex w-full h-full flex-row gap-[48px] px-[24px] py-[20px]">
          <div className="w-[396px] h-full flex flex-col gap-[20px]">
            <span className="w-full h-[40px] flex flex-row rounded-[100px] bg-[#F3F4F6]">
              <button
                className="w-full h-full rounded-[20px]"
                style={{
                  background: isExpense ? "#0166FF" : "#F3F4F6",
                  color: isExpense ? "#fff" : "#000",
                }}
                onClick={(e) => {
                  e.preventDefault();
                  !isExpense ? setIsExpense(true) : "";
                }}
              >
                Expense
              </button>
              <button
                className="w-full h-full rounded-[20px]"
                style={{
                  background: !isExpense ? "#0166FF" : "#F3F4F6",
                  color: !isExpense ? "#fff" : "#000",
                }}
                onClick={(e) => {
                  e.preventDefault();
                  isExpense ? setIsExpense(false) : "";
                }}
              >
                Income
              </button>
            </span>
            <div className="w-full h-[76px] relative">
              <input
                type="text"
                placeholder="₮ 000.00"
                className="w-full bg-[#F3F4F6] h-full px-[16px] pb-[12px] text-[20px] pt-[36px]"
                onChange={(e) => {
                  setAmount(e.target.value);
                }}
              ></input>
              <p className="absolute top-[12px] left-[16px]">Amount</p>
              {openCategory && (
                <ShowCategoryOfAddRecord
                  icon={setSelectedIconRecord}
                  select={setSelectedCategory}
                  open={setOpenCategory}
                  color={setRecordColor}
                ></ShowCategoryOfAddRecord>
              )}
            </div>
            <div className="flex flex-col gap-[8px]">
              <p>Category</p>
              <div
                className="w-full rounded-lg h-[48px] flex flex-row items-center px-[16px] bg-red-50 justify-between"
                onClick={() => {
                  setOpenCategory(!openCategory);
                }}
              >
                <Icon color={RecordColor}></Icon>
                {selectedCategory ? selectedCategory : <p>Choose</p>}
                <Image
                  alt="Picture of the author"
                  src="/black_arrow_down.svg"
                  width={24}
                  height={24}
                  className="cursor-pointer"
                ></Image>
              </div>
            </div>
            <div className="w-full h-fit flex flex-row gap-[12px]">
              <div className="w-full flex flex-col gap-[8px]">
                <p>Date</p>
                <input
                  type="date"
                  className="w-full h-[48px] rounded-lg bg-[#F9FAFB]"
                  onChange={(e) => {
                    setDate(e.target.value);
                  }}
                ></input>
              </div>
              <div className="w-full flex flex-col gap-[8px]">
                <p>Time</p>
                <input
                  type="time"
                  className="w-full h-[48px] rounded-lg bg-[#F9FAFB]"
                  onChange={(e) => {
                    setTime(e.target.value);
                  }}
                ></input>
              </div>
            </div>
            <input
              type="submit"
              className="bg-[#0166FF] rounded-[20px] w-full text-white h-[40px]"
              onClick={() => {
                addRecord_(
                  amount,
                  date,
                  isExpense,
                  selectedCategory,
                  time,
                  IconColor,
                  selectedIcon
                );
                setIsOpenRecord(false);
              }}
              value="Add Record"
            ></input>
          </div>
          <div className="w-[396px] h-full flex flex-col gap-[22px] px-[18px]">
            <div className="w-full h-fit flex flex-col gap-[8px]">
              <p>Payee</p>
              <input
                type="text"
                placeholder="Write here"
                className="rounded-lg px-[16px] h-[48px] w-full py-[12px] bg-[#F9FAFB]"
              ></input>
            </div>
            <div className="w-full h-full flex flex-col gap-[8px]">
              <p>Note</p>
              <textarea
                type="text"
                placeholder="Write here"
                className="w-full bg-[#F3F4F6] p-[16px] h-full rounded-lg"
              ></textarea>
            </div>
          </div>
        </main>
      </div>
    </section>
  );
}
