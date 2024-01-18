"use client";
import { Context_ } from "@/app/records/page";
import { useAuth } from "@/components/provider/AuthProvider";
import { useContext } from "react";
import * as icons from "react-icons/gr";

export default function RecordsMain() {
  const { selectedType, search, selectedCategory, amountPrice } =
    useContext(Context_);
  const { recordData, checked, isReadyRecord } = useAuth();
  return (
    <main className="w-full h-fit flex flex-col gap-[12px]">
      {isReadyRecord &&
        recordData
          .filter((record) => {
            return search.toLowerCase() === ""
              ? true
              : record.selectedCategory.toLowerCase().includes(search);
          })
          .filter((record) => {
            console.log("hi", record.amount, amountPrice);
            return Number(amountPrice) < Number(record.amount);
          })
          .filter((record) => {
            if (selectedType === "All") return true;
            if (selectedType === "Expense") return record.isExpense === true;
            if (selectedType === "Income") return record.isExpense === false;
          })
          .filter((record) => {
            return selectedCategory === ""
              ? record
              : record.selectedCategory === selectedCategory;
          })
          .map((record, index) => {
            const Icon = icons[record.selectedIcon];
            const Color = record.IconColor;
            console.log(typeof record.amount, record.amount);
            const number = new Intl.NumberFormat().format(record.amount);
            return (
              <div
                key={index}
                className="w-full h-[48px] bg-white rounded-[12px] flex justify-between  flex-row items-center px-[24px] bg-white-300"
              >
                <span className="h-fit justify-between items-center gap-[8px] flex flex-row">
                  <input type="checkbox" checked={!checked}></input>
                  <span
                    className="w-10 h-10 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: Color }}
                  >
                    <Icon color={"#fff"} size={20}></Icon>
                  </span>
                  <div className="flex flex-col h-full w-fit justify-between">
                    <label>{record.selectedCategory}</label>
                    <label>{record.date}</label>
                  </div>
                </span>
                <p style={{ color: record.isExpense ? "#23E01F" : "#F54949" }}>
                  {`${number}₮`}
                </p>
              </div>
            );
          })}
    </main>
  );
}
