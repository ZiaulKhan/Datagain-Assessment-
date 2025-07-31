import { RiSearch2Line } from "react-icons/ri";

export default function SearchInput({
  placeholder,
  className,
}: {
  placeholder?: string;
  className?: string;
}) {
  return (
    <div
      className={`${className} flex items-center border border-gray-200 rounded-md ps-2 shadow-inner`}
    >
      <RiSearch2Line />
      <input
        type="text"
        placeholder={placeholder || "Search"}
        className="px-3 py-2 text-sm text-gray-600 border-none outline-0 w-full"
      />
    </div>
  );
}
