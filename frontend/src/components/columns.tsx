"use client"

import { type ColumnDef } from "@tanstack/react-table"
import { format } from "date-fns"
import type { Log } from "@/types/logs"
import { useLogsStore } from "@/store/logs-store"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<Log>[] = [
  {
    accessorKey: "fileName",
    header: "File Name",
    cell: ({ row }) => {
      const { setFileName } = useLogsStore()
      const fileName = row.original.fileName

      return (
        <button
          className="text-blue-500 hover:text-blue-700 hover:underline"
          onClick={() => setFileName(fileName)}
        >
          {fileName}
        </button>
      )
    },
  },
  {
    accessorKey: "dateModified",
    header: "Date Modified",
    cell: ({ row }) => {
      const date = new Date(row.original.dateModified)

      return format(date, "MM/dd/yyyy - HH:mm:ss")
    },
  },
  {
    accessorKey: "timeStatus",
    header: "Time Status",
  },
]
