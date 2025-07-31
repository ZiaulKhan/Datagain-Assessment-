import React from "react";
import { UseFormReturn } from "react-hook-form";
import InputField from "../common/InputField";
import { LetterData } from "@/types/letter";

type LetterFormProps = {
  initialData?: LetterData;
  onSubmit: (data: LetterData) => void;
  onClose: () => void;
  form: UseFormReturn<LetterData>;
};

const fieldConfigs = [
  { name: "taxYear", label: "Tax Year", placeholder: "Enter Year" },
  { name: "company", label: "Company", placeholder: "Enter company name" },
  { name: "state", label: "State", placeholder: "Enter State e.g., CA" },
  { name: "assessor", label: "Assessor", placeholder: "Enter assessor name" },
  { name: "account", label: "Account", placeholder: "Enter account" },
  { name: "appealedDate", label: "Appealed Date", placeholder: "Enter date" },
  { name: "status", label: "Status", placeholder: "Sent / Not Sent" },
] as const;

const inputClassName =
  "p-[0.5rem] text-[1rem] w-full focus-visible:outline-none border-[0.1rem] border-[#D9D9D9] placeholder:text-[#D9D9D9] placeholder:text-[0.9rem] overflow-ellipsis rounded-[0.5rem]";
const labelClassName = "text-[0.9rem]";

const LetterForm = ({
  initialData,
  onSubmit,
  onClose,
  form,
}: LetterFormProps) => {
  const handleSubmit = form.handleSubmit((data) => {
    const finalData = {
      ...data,
      id: initialData?.id || Date.now().toString(),
    };
    onSubmit(finalData);
    onClose();
  });

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      {fieldConfigs.map((field) => (
        <InputField
          key={field.name}
          name={field.name}
          label={field.label}
          required
          form={form}
          inputProps={{ placeholder: field.placeholder }}
          inputClassName={inputClassName}
          labelClassName={labelClassName}
        />
      ))}

      <button
        type="submit"
        className="bg-[#3fc3ac] text-white rounded-lg py-2 cursor-pointer"
      >
        Save
      </button>
    </form>
  );
};

export default LetterForm;
