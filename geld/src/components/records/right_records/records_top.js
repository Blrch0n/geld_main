import { useAuth } from "@/components/provider/AuthProvider";

export default function HeaderRecords() {
  const { days, addDays, recordData, isReadyRecord } = useAuth();
  return (
    <footer className="flex flex-col gap-[24px] w-full h-fit">
      <div className="flex flex-row w-full justify-between items-center">
        <span
          onClick={() => {
            addDays();
          }}
        >
          {`Last ${days} Days`}
        </span>
        <select className="select select-bordered w-full max-w-xs">
          <option disabled>Newest first</option>
          <option>Latest</option>
          <option>Recently</option>
        </select>
      </div>
      <div className="w-full h-[48px] bg-white rounded-[12px] flex justify-between  flex-row items-center px-[24px] bg-white-300">
        <span className="h-fit justify-between items-center gap-[8px] flex flex-row">
          <input type="checkbox"></input>
          <label>Select all</label>
        </span>
        <p className='text-[#0166FF]'>
          {isReadyRecord &&
            new Intl.NumberFormat().format(
              recordData.reduce(
                (total, currentValue) => total + Number(currentValue.amount),
                0
              )
            )}
        </p>
      </div>
    </footer>
  );
}
