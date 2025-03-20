import { Report } from "@highschool/interfaces";
import { create } from "zustand";

interface ReportState {
  isOpenDelete: boolean;
  isOpenEdit: boolean;
  report: Report | null;
  openDelete: (report: Report) => void;
  openEdit: (report: Report) => void;
}

const useReportStore = create<ReportState>((set) => ({
  isOpenDelete: false,
  isOpenEdit: false,
  report: null,
  openDelete: (report) =>
    set({
      isOpenDelete: true,
      isOpenEdit: false,
      report: report,
    }),
  openEdit: (report) =>
    set({
      isOpenEdit: true,
      isOpenDelete: false,
      report: report,
    }),
}));

export { useReportStore };
