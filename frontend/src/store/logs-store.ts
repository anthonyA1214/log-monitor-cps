import { create } from "zustand"

interface LogsState {
  logId: string | null
  open: boolean

  setLogId: (logId: string | null) => void
  setOpen: (open: boolean) => void

  openDialog: (logId: string | null) => void
  closeDialog: () => void
}

export const useLogsStore = create<LogsState>((set) => ({
  logId: null,
  open: false,

  setLogId: (logId) => set({ logId }),
  setOpen: (open) => set({ open }),

  openDialog: (logId) => set({ logId, open: true }),
  closeDialog: () => {
    set({ open: false })
    setTimeout(() => set({ logId: null }), 200)
  },
}))
