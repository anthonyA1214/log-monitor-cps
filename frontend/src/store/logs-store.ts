import { create } from "zustand"

interface LogsState {
  fileName: string | null
  setFileName: (fileName: string | null) => void
}

export const useLogsStore = create<LogsState>((set) => ({
  fileName: null,
  setFileName: (fileName) => set({ fileName }),
}))
