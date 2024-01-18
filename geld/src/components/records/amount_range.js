import { Context_ } from "@/app/records/page";
import { useContext } from "react";

export default function AmountRange() {
  const { amountPrice, setAmountPrice } = useContext(Context_);
  return (
    <div className="w-full h-fit flex flex-col gap-[16px]">
      <footer>
        <h1 className="text-[16px] font-[600] text-black">Amount Range</h1>
      </footer>
      <div className="flex flex-row w-full h-fit gap-[16px]">
        <input
          type="text"
          placeholder="0"
          value={0}
          className="w-full h-[48px] rounded-lg p-[12px] bg-[#F3F4F6] text-black border-2 border-[#D1D5DB]"
        ></input>
        <input
          type="text"
          placeholder="1000000"
          value={Number(amountPrice)}
          className="w-full h-[48px] rounded-lg p-[12px] bg-[#F3F4F6] text-black border-2 border-[#D1D5DB]"
        ></input>
      </div>
      <div className="w-full h-fit">
        <label style={{ left: `${(100 / 10000) * Number(amountPrice)}%` }}>
          {amountPrice}
        </label>
        <input
          type="range"
          className="w-full"
          min="0"
          max="1000000"
          onChange={(e) => {
            setAmountPrice(e.target.value);
          }}
        ></input>
      </div>
    </div>
  );
}
