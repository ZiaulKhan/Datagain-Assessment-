"use client";
import AppealTable from "@/components/AppealTable";

export default function AppealLettersPage() {
  return (
    <div className="h-full relative overflow-hidden">
      <div className="mx-4 w-fit flex flex-col">
        <h1 className="flex items-center gap-3 text-lg text-gray-700 font-semibold pb-2 w-fit">
          Appeal Letters{" "}
        </h1>
        <span className="bg-[#3fc3ac] pb-[0.222rem] w-full rounded-2xl" />
      </div>
      <AppealTable />
    </div>
  );
}
