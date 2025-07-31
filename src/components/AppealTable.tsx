"use client";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import {
  toggleSelect,
  selectAll,
  clearSelection,
  editLetter,
  addLetter,
  deleteLetter,
} from "@/redux/slices/appealLettersSlice";
import { useState, useEffect, useMemo } from "react";
import { ImDownload } from "react-icons/im";
import { FaSort } from "react-icons/fa";
import { GiSettingsKnobs } from "react-icons/gi";
import { PiDotsThreeCircleVerticalFill } from "react-icons/pi";
import { HiDotsVertical } from "react-icons/hi";
import { MdDelete, MdEdit } from "react-icons/md";
import Input from "./common/SearchInput";
import Pagination from "./common/Pagination";
import CustomCheckbox from "./common/Checkbox";
import DeleteModal from "./Appeal/DeleteAppeal";
import AddEditAppeal from "./Appeal/AddEditAppeal";
import { useForm } from "react-hook-form";
import { appealSchema } from "./Appeal/validationSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { LetterData } from "@/types/letter";
import ActionBar from "./Appeal/ActionBar";

const tableHeads = [
  "Tax Year",
  "Company",
  "State",
  "Assessor",
  "Account",
  "Appealed Date",
  "Status",
];

const emptyLetter: LetterData = {
  taxYear: 0,
  company: "",
  state: "",
  assessor: "",
  account: "",
  appealedDate: "",
  status: "",
};

export default function AppealTable() {
  const dispatch = useDispatch();
  const { data, selected } = useSelector(
    (state: RootState) => state.appealLetters
  );

  const collapsed = useSelector((state: RootState) => state.sidebar.collapsed);

  const [showActionBar, setShowActionBar] = useState(false);
  const [showRowActions, setShowRowActions] = useState<string | null>(null);
  const [showTableMenu, setShowTableMenu] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [showAddEditModal, setShowAddEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editData, setEditData] = useState<LetterData | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const form = useForm<LetterData>({
    resolver: yupResolver(appealSchema),
  });

  const handleSortByYear = () => {
    setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
  };

  const handleModalOpen = () => {
    form.reset(emptyLetter);
    setEditData(null);
    setShowAddEditModal(true);
  };

  const handleModalClose = () => {
    setShowAddEditModal(false);
    setEditData(null);
    form.reset(emptyLetter);
  };

  const handleSave = (letter: LetterData) => {
    if (editData) {
      dispatch(editLetter({ id: editData.id, updatedData: letter }));
    } else {
      dispatch(addLetter({ ...letter, id: Date.now().toString() }));
    }
    handleModalClose();
  };

  const handleEdit = (row: LetterData) => {
    setEditData(row);
    form.reset(row);
    setShowAddEditModal(true);
    setShowRowActions(null);
  };

  const handleDelete = () => {
    if (editData?.id) {
      dispatch(deleteLetter(editData.id));
    }
    setShowDeleteModal(false);
  };

  const handleSelectAll = () => {
    if (selected.length === data.length) {
      dispatch(clearSelection());
    } else {
      dispatch(selectAll());
    }
    setShowActionBar(true);
  };

  const sortedData = useMemo(() => {
    return [...data].sort((a, b) =>
      sortOrder === "asc"
        ? Number(a.taxYear) - Number(b.taxYear)
        : Number(b.taxYear) - Number(a.taxYear)
    );
  }, [data, sortOrder]);

  const itemsPerPage = 6;
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return sortedData.slice(start, start + itemsPerPage);
  }, [sortedData, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [data.length]);

  return (
    <div className="bg-white rounded-xl shadow p-5 flex flex-col justify-between gap-4.5 h-[calc(100%-40px)]">
      <div className="flex gap-4 items-center justify-between">
        <button
          onClick={handleModalOpen}
          className="bg-[#43baa4] hover:bg-[#539589] flex items-center gap-3 py-1 px-4 rounded-lg text-white font-medium shadow-lg cursor-pointer"
        >
          <span className="text-[20px]">+</span> Add New
        </button>
        <div className="flex-1 flex gap-4 items-center justify-end">
          <Input
            className="w-[40%]"
            placeholder="Search by Property, Jurisdiction, Parcel No or Client"
          />
          <GiSettingsKnobs className="border size-8 p-1.5 rounded-md text-[#3fc3ac] cursor-pointer" />
          <div className="relative">
            <PiDotsThreeCircleVerticalFill
              className={`text-[2.5rem] cursor-pointer ${
                showTableMenu ? "text-red-400" : "text-gray-400"
              }`}
              onClick={() => setShowTableMenu((prev) => !prev)}
            />
            {showTableMenu && (
              <div className="w-[10rem] absolute right-0 top-12 bg-white border border-gray-200 p-2 rounded-lg shadow-xl">
                <button className="w-full p-2 flex items-center gap-2 text-sm text-slate-700 hover:bg-gray-200 rounded-md">
                  <ImDownload /> Export
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-md border-y border-gray-200 h-full overflow-auto table-scrollbar">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-[#ECF3f9]">
            <tr>
              <th className="px-4 py-4">
                <CustomCheckbox
                  checked={selected.length === data.length}
                  onChange={handleSelectAll}
                />
              </th>
              {tableHeads.map((th) => (
                <th
                  key={th}
                  className="text-xs text-left uppercase text-slate-600 px-4 py-2"
                >
                  <span className="flex items-center gap-1.5">
                    {th}
                    {th === "Tax Year" && (
                      <FaSort
                        className="cursor-pointer"
                        onClick={handleSortByYear}
                      />
                    )}
                  </span>
                </th>
              ))}
              <th className="text-xs text-left uppercase text-slate-600 px-4 py-2">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200/50">
            {paginatedData.map((row) => (
              <tr
                key={row.id}
                className={`hover:bg-gray-50 [&>*]:px-4 [&>*]:py-6 my-2 rounded-2xl ${
                  selected.includes(row.id) && "bg-gray-100 "
                }`}
              >
                <td>
                  <CustomCheckbox
                    checked={selected.includes(row.id)}
                    onChange={() => dispatch(toggleSelect(row.id))}
                  />
                </td>
                <td>{row.taxYear}</td>
                <td title={row.company}>{row.company.slice(0, 22)}...</td>
                <td>{row.state}</td>
                <td>{row.assessor}</td>
                <td>{row.account}</td>
                <td>{row.appealedDate}</td>
                <td>{row.status}</td>
                <td>
                  <div className="relative w-fit ms-4">
                    <HiDotsVertical
                      className="text-xl cursor-pointer"
                      onClick={() =>
                        setShowRowActions((prev) =>
                          prev !== row.id ? row.id : null
                        )
                      }
                    />
                    {showRowActions === row.id && (
                      <div className="w-[10rem] absolute right-7 top-2 bg-white border p-2 rounded-lg shadow-xl z-50 space-y-2">
                        <button
                          onClick={() => handleEdit(row)}
                          className="w-full flex items-center gap-2 p-2 text-sm text-slate-700 hover:bg-gray-200 rounded-md"
                        >
                          <MdEdit /> Edit Letter
                        </button>
                        <button
                          onClick={() => {
                            setEditData(row);
                            setShowDeleteModal(true);
                            setShowRowActions(null);
                          }}
                          className="w-full flex items-center gap-2 p-2 text-sm text-slate-700 hover:bg-gray-200 rounded-md"
                        >
                          <MdDelete /> Delete Letter
                        </button>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Pagination
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        totalPages={Math.ceil(data.length / itemsPerPage)}
        onPageChange={setCurrentPage}
      />

      <ActionBar
        selectedLength={selected.length}
        showActionBar={showActionBar}
        collapsed={collapsed}
        handleClose={() => setShowActionBar(false)}
      />

      <AddEditAppeal
        form={form}
        isOpen={showAddEditModal}
        onClose={handleModalClose}
        initialData={editData || emptyLetter}
        onSubmit={handleSave}
      />

      <DeleteModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
      />
    </div>
  );
}
