"use client";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { toggleSidebar } from "@/redux/slices/sidebarSlice";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IoIosArrowBack } from "react-icons/io";
import { TbLayoutDashboardFilled } from "react-icons/tb";
import { FaCalendarDays, FaLandmarkFlag } from "react-icons/fa6";
import { LiaPowerOffSolid } from "react-icons/lia";
import { IoSettings } from "react-icons/io5";
import { MdAssessment, MdManageAccounts } from "react-icons/md";
import { RiPriceTag2Fill } from "react-icons/ri";
import { GiMultiDirections } from "react-icons/gi";

const navItems = [
  { label: "Dashboard", path: "/dashboard", icon: <TbLayoutDashboardFilled /> },
  {
    label: "Appeal Letters",
    path: "/appeal-letters",
    icon: <FaLandmarkFlag />,
  },
  { label: "Calendar", path: "/calendar", icon: <FaCalendarDays /> },
  { label: "Accounts", path: "/accounts", icon: <MdManageAccounts /> },
  { label: "Batches", path: "/batches", icon: <RiPriceTag2Fill /> },
  {
    label: "Resolution",
    path: "/resolution",
    icon: <GiMultiDirections />,
  },
  {
    label: "Assessments",
    path: "/assessments",
    icon: <MdAssessment />,
  },
];

export default function Sidebar() {
  const dispatch = useDispatch();
  const collapsed = useSelector((state: RootState) => state.sidebar.collapsed);
  const pathname = usePathname();

  return (
    <div
      className={`bg-[#2C4E6C] text-white shadow-md h-full transition-all duration-300 ${
        collapsed ? "w-15" : "w-55"
      } relative rounded-2xl`}
    >
      <button
        className={`${
          collapsed && "rotate-180"
        } absolute -right-4 top-4 text-[1.3rem] drop-shadow-[0_0px_4px_rgba(0,0,0,0.25)] hover:drop-shadow-[0_0px_6px_rgba(0,0,0,0.25)] rounded-full text-[#4ed6be] bg-white p-1 cursor-pointer z-50`}
        onClick={() => dispatch(toggleSidebar())}
      >
        <IoIosArrowBack />
      </button>
      <div
        className={`h-full rounded-2xl [&>*]:overflow-x-hidden overflow-hidden`}
      >
        <nav className="flex flex-col justify-between items-center px-4 py-5 h-[inherit] sidebar-scrollbar">
          <div
            className={`flex flex-col gap-4 w-full py-2
            ${collapsed && "justify-center items-center"}
             `}
          >
            {navItems.map((item) => (
              <Link
                title={collapsed ? item.label : undefined}
                key={item.path}
                href={item.path}
                className={`flex items-center gap-3 py-2.5 ${
                  pathname === item.path ? "bg-white/15" : ""
                }  ${
                  collapsed
                    ? "justify-center rounded-full px-2.5"
                    : "rounded-sm px-4 "
                } transition-all ease-in-out hover:bg-white/10`}
              >
                <span className="text-[20px]">{item.icon}</span>
                {!collapsed && (
                  <span className="text-[14px] whitespace-nowrap">
                    {item.label}
                  </span>
                )}
              </Link>
            ))}
          </div>
          <div
            className={`flex flex-col gap-4 w-full 
            ${collapsed && "justify-center items-center "}
            `}
          >
            <Link
              title={collapsed ? "Setting" : undefined}
              href={"/"}
              className={`flex items-center gap-3 py-2.5 ${
                pathname === "/settings" ? "bg-white/15" : ""
              } ${
                collapsed
                  ? "justify-center rounded-full px-2.5"
                  : "rounded-sm px-4 "
              } transition-all ease-in-out hover:bg-white/10`}
            >
              <span className="text-[20px] hover:animate-spin ">
                <IoSettings />
              </span>
              {!collapsed && <span className="text-[14px]">Settings</span>}
            </Link>
            <button
              className={`bg-[#43baa4] hover:bg-[#5ea79a] flex justify-center items-center gap-3 py-2.5 ${
                collapsed ? " rounded-full px-2.5 " : "rounded-lg px-4 "
              } cursor-pointer transition-all ease-in-out shadow-lg font-medium`}
            >
              <span className="text-[20px]">
                <LiaPowerOffSolid />
              </span>
              {!collapsed && <span className="text-[14px] ">Logout</span>}
            </button>
          </div>
        </nav>
      </div>
    </div>
  );
}
