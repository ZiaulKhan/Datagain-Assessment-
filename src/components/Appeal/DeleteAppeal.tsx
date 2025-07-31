import CommonModal from "../common/Modal";

type DeleteModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

export default function DeleteModal({
  isOpen,
  onClose,
  onConfirm,
}: DeleteModalProps) {
  return (
    <CommonModal isOpen={isOpen} onClose={onClose} title="Delete Letter">
      <p className="text-gray-600 mb-4">
        Are you sure you want to delete this letter?
      </p>
      <div className="flex justify-end gap-3">
        <button
          onClick={onClose}
          className="border px-4 py-2 rounded-lg cursor-pointer"
        >
          Cancel
        </button>
        <button
          onClick={onConfirm}
          className="bg-red-500 text-white px-4 py-2 rounded-lg cursor-pointer"
        >
          Delete
        </button>
      </div>
    </CommonModal>
  );
}
