import CommonModal from "../common/Modal";
import LetterForm from "./Form";
import { AddEditProps } from "@/types/letter";

export default function AddEditAppeal({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  form,
}: AddEditProps) {
  return (
    <CommonModal
      isOpen={isOpen}
      onClose={onClose}
      title={initialData.id ? "Edit Letter" : "Add New Letter"}
    >
      <LetterForm
        form={form}
        onSubmit={onSubmit}
        initialData={initialData}
        onClose={onClose}
      />
    </CommonModal>
  );
}
