type Props = {
  checked: boolean;
  onChange: (checked: boolean) => void;
};

export default function CustomCheckbox({ checked, onChange }: Props) {
  const handleClick = () => {
    onChange(!checked);
  };

  return (
    <div onClick={handleClick} className="cursor-pointer w-5 h-5">
      <div
        className={`w-full h-full flex items-center justify-center rounded-md transition-all 
          ${
            checked
              ? "bg-red-400 text-white"
              : "border-2 border-slate-500 text-transparent"
          }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-4 h-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={3}
            d="M5 13l4 4L19 7"
          />
        </svg>
      </div>
    </div>
  );
}
