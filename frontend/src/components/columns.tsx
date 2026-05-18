"use client"

import { type ColumnDef } from "@tanstack/react-table"
import { format } from "date-fns"
import type { Log } from "@/types/logs"
import { useLogsStore } from "@/store/logs-store"
import { getTimeStatus } from "@/lib/time-status"
import { cn } from "@/lib/utils"

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
    cell: ({ row }) => {
      const status = getTimeStatus(new Date(row.getValue("dateModified")))

    return (
      <span className={cn(
        "rounded-md px-2 py-1 text-xs font-medium",
        status === "green" && "bg-green-100 text-green-700",
        status === "yellow" && "bg-yellow-100 text-yellow-700",
        status === "red" && "bg-red-100 text-red-700",
      )}>
        {status === "green" ? "Recent" : status === "yellow" ? "Aging" : "Old"}
      </span>
    )
    },
  },
]
