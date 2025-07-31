import { BiSolidBell } from "react-icons/bi";
import { CgMenuGridO } from "react-icons/cg";

import Input from "./common/SearchInput";

export default function Topbar() {
  return (
    <div className="bg-white drop-shadow-[0_0px_5px_rgba(0,0,0,0.02)] h-16 flex items-center justify-between px-4 rounded-2xl">
      <h2 className="text-lg font-semibold text-[#4ed6be]">
        Property Tax Plus
      </h2>

      <Input className="w-1/3" />
      <div className="flex gap-5 [&>*]:cursor-pointer  [&_span]:hover:text-slate-700 ">
        <div className="w-8 h-8 my-auto bg-slate-500 text-white rounded-full grid place-content-center  hover:bg-slate-700 transition-all duration-500">
          ZK
        </div>
        <div className="border-gray-300 border my-0.5" />
        <span className="text-slate-500 text-2xl my-auto">
          <BiSolidBell />
        </span>
        <div className="border-gray-300 border my-0.5" />
        <span className=" text-slate-500 text-[2rem] my-auto">
          <CgMenuGridO />
        </span>
      </div>
    </div>
  );
}
