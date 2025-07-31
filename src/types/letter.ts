import { UseFormReturn } from "react-hook-form";

export type AppealRow = {
  id: string;
  taxYear: number;
  company: string;
  state: string;
  assessor: string;
  account: string;
  appealedDate: string;
  status: "Sent" | "Not Sent";
};

export type LetterData = {
  id?: string;
  taxYear: number;
  company: string;
  state: string;
  assessor: string;
  account: string;
  appealedDate: string;
  status: string;
};

export type AddEditProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: LetterData) => void;
  initialData: LetterData;
  form: UseFormReturn<LetterData>;
};
