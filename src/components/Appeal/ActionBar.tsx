import React from "react";
import { ImDownload } from "react-icons/im";
import { IoClose } from "react-icons/io5";

const ActionBar = ({
  selectedLength,
  showActionBar,
  collapsed,
  handleClose,
}: {
  selectedLength: number;
  showActionBar: boolean;
  collapsed: boolean;
  handleClose: () => void;
}) => {
  return (
    <div
      className={`${
        selectedLength > 0 && showActionBar ? "bottom-10 " : "-bottom-50 "
      } fixed w-fit mx-auto ${
        collapsed ? "right-0 left-0" : "right-2/12"
      } bg-[#ecf3f9] drop-shadow-[0_0px_10px_rgba(0,0,0,0.1)] border border-[#a4c0d8] rounded-xl py-4 px-6 flex gap-4 justify-end items-center z-50 transition-all duration-700`}
    >
      <p className="font-medium text-slate-800">
        {selectedLength} Appeal Letter selected
      </p>
      <div className="flex gap-2">
        <button className="flex items-center gap-2  px-4 py-2 border border-[#3fc3ac] text-[#3fc3ac] rounded-lg text-sm cursor-pointer">
          <ImDownload /> Export Grid Details
        </button>
        <button className="px-4 py-2 border border-[#3fc3ac] text-[#3fc3ac] rounded-lg text-sm cursor-pointer">
          Download Letters
        </button>
        <button className="px-4 py-2 bg-[#3fc3ac] text-white rounded-lg text-sm cursor-pointer">
          Change Status
        </button>
      </div>
      <IoClose className="text-[1.5rem] cursor-pointer" onClick={handleClose} />
    </div>
  );
};

export default ActionBar;
