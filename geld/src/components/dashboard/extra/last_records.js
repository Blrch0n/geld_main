import { useAuth } from "@/components/provider/AuthProvider";
import * as icons from "react-icons/gr";

export default function LastRecords() {
  const { isReadyRecord, recordData } = useAuth();
  return (
    <div className="flex flex-col w-full h-fit rounded-[12px] bg-white">
      <header className="flex flex-row w-full h-[56px] items-center px-[24px]">
        <h1>Last Records</h1>
      </header>
      <hr></hr>
      <main className="w-full h-[400px] flex flex-col overflow-y-auto bg-scroll px-6">
        {isReadyRecord &&
          recordData.map((record, index) => {
            const Icon = icons[record.selectedIcon];
            const Color = record.IconColor;
            const number = new Intl.NumberFormat().format(record.amount);
            return (
              <div
                className="flex flex-row w-full py-[20px] h-[80px] items-center justify-between"
                key={index}
              >
                <div className="w-fit h-fit flex gap-4">
                  <span
                    className="w-[40px] h-[40px] flex items-center justify-center rounded-full"
                    style={{ backgroundColor: `${Color}` }}
                  >
                    <Icon></Icon>
                  </span>
                  <div className="flex flex-col w-fit h-fit gap-[]">
                    <h1>{record.selectedCategory}</h1>
                    <p>{record.time}</p>
                  </div>
                </div>
                <p style={{ color: record.isExpense ? "#23E01F" : "#F54949" }}>
                  {`${number}₮`}
                </p>
              </div>
            );
          })}
      </main>
    </div>
  );
}
