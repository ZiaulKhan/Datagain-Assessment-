"use client";

import { ReactNode } from "react";
import { IoClose } from "react-icons/io5";

export type CommonModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  width?: string;
};

export default function CommonModal({
  isOpen,
  onClose,
  title,
  children,
  width = "max-w-lg",
}: CommonModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 flex justify-center items-center z-50">
      <div
        className={`bg-white rounded-xl shadow-lg p-6 w-full ${width} relative`}
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700 cursor-pointer"
        >
          <IoClose size={24} />
        </button>

        {title && (
          <h2 className="text-lg font-semibold mb-4 text-gray-800">{title}</h2>
        )}

        {children}
      </div>
    </div>
  );
}
