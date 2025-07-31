import { AppealRow } from "@/types/letter";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AppealLettersState {
  data: AppealRow[];
  selected: string[];
}

const initialState: AppealLettersState = {
  data: [
    {
      id: "1",
      taxYear: 2017,
      company: "Alabama and Gulf Coast Railway LLC",
      state: "AL",
      assessor: "Wilcox County Tax Collector",
      account: "1_87060",
      appealedDate: "June 25, 2017",
      status: "Sent",
    },
    {
      id: "2",
      taxYear: 2018,
      company: "First Coast Railroad Inc.",
      state: "GA",
      assessor: "Camden County Tax",
      account: "UTIL150_ Camden County",
      appealedDate: "June 26, 2018",
      status: "Not Sent",
    },
    {
      id: "3",
      taxYear: 2019,
      company: "Abcd",
      state: "CA",
      assessor: "Abc County Tax",
      account: "UTIL150_ Camden County",
      appealedDate: "June 27, 2019",
      status: "Sent",
    },
    {
      id: "4",
      taxYear: 2020,
      company: "EFGH",
      state: "HJ",
      assessor: "Camden County Tax",
      account: "UTIL150_ Camden County",
      appealedDate: "June 28, 2020",
      status: "Not Sent",
    },
    {
      id: "5",
      taxYear: 2021,
      company: "IJKL",
      state: "LD",
      assessor: "Camden County Tax",
      account: "UTIL150_ Camden County",
      appealedDate: "June 29, 2021",
      status: "Sent",
    },
    {
      id: "6",
      taxYear: 2022,
      company: "MNOP",
      state: "DW",
      assessor: "Camden County Tax",
      account: "UTIL150_ Camden County",
      appealedDate: "June 30, 2022",
      status: "Not Sent",
    },
    {
      id: "7",
      taxYear: 2023,
      company: "RSTU",
      state: "OP",
      assessor: "Camden County Tax",
      account: "UTIL150_ Camden County",
      appealedDate: "June 31, 2023",
      status: "Sent",
    },
    {
      id: "8",
      taxYear: 2024,
      company: "QRST",
      state: "GA",
      assessor: "Camden County Tax",
      account: "UTIL150_ Camden County",
      appealedDate: "July 1, 2024",
      status: "Not Sent",
    },
    {
      id: "9",
      taxYear: 2025,
      company: "WXYZ",
      state: "EW",
      assessor: "Camden County Tax",
      account: "UTIL150_ Camden County",
      appealedDate: "Aug 25, 2025",
      status: "Sent",
    },
    {
      id: "10",
      taxYear: 2026,
      company: "GHIJ",
      state: "ZZ",
      assessor: "Camden County Tax",
      account: "UTIL150_ Camden County",
      appealedDate: "Sep 25, 2026",
      status: "Not Sent",
    },
    {
      id: "11",
      taxYear: 2027,
      company: "EY",
      state: "UP",
      assessor: "Income Tax",
      account: "EY_435435",
      appealedDate: "Oct 2, 2027",
      status: "Sent",
    },
    {
      id: "12",
      taxYear: 2028,
      company: "Black Rock",
      state: "UK",
      assessor: "UK Tax",
      account: "BR_68766",
      appealedDate: "Jan 26, 2028",
      status: "Not Sent",
    },
  ],
  selected: [],
};

const appealLettersSlice = createSlice({
  name: "appealLetters",
  initialState,
  reducers: {
    toggleSelect(state, action: PayloadAction<string>) {
      const id = action.payload;
      if (state.selected.includes(id)) {
        state.selected = state.selected.filter((i) => i !== id);
      } else {
        state.selected.push(id);
      }
    },
    clearSelection(state) {
      state.selected = [];
    },
    selectAll(state) {
      state.selected = state.data.map((row) => row.id);
    },
    addLetter: (state, action) => {
      state.data.push(action.payload);
    },
    editLetter: (state, action) => {
      const { id, updatedData } = action.payload;
      const index = state.data.findIndex((item) => item.id === id);
      if (index !== -1) {
        state.data[index] = { ...state.data[index], ...updatedData };
      }
    },
    deleteLetter: (state, action) => {
      state.data = state.data.filter((item) => item.id !== action.payload);
    },
  },
});

export const {
  toggleSelect,
  clearSelection,
  selectAll,
  addLetter,
  editLetter,
  deleteLetter,
} = appealLettersSlice.actions;
export default appealLettersSlice.reducer;
