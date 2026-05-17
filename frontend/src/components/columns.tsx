"use client"

import { type ColumnDef } from "@tanstack/react-table"
import { format } from "date-fns"
import AppDialog from "./app-dialog"
import type { Log } from "@/types/logs"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<Log>[] = [
  {
    accessorKey: "fileName",
    header: "File Name",
    cell: ({ row }) => {
      const fileName = row.original.fileName

      return (
        <AppDialog fileName={fileName} content={`Content of ${fileName}`} />
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
