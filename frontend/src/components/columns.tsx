"use client"

import { type ColumnDef } from "@tanstack/react-table"
import { format, formatDistanceToNow } from "date-fns"
import {
  FILE_STATUS_LABEL,
  FILE_STATUS_STYLES,
  getTimeStatus,
} from "@/lib/file-status"
import { cn } from "@/lib/utils"
import { Link } from "@tanstack/react-router"
import { Badge } from "./ui/badge"
import type { Log } from "@/lib/schemas/logs"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<Log>[] = [
  {
    accessorKey: "fileName",
    header: "File Name",
    cell: ({ row }) => {
      const fileName = row.original.fileName

      return (
        <Link
          className="text-blue-500 hover:text-blue-700 hover:underline"
          to={`/logs/$fileName`}
          params={{ fileName }}
        >
          {fileName}
        </Link>
      )
    },
  },
  {
    accessorKey: "fileModifiedAt",
    header: "Date Modified",
    cell: ({ row }) => {
      const date = new Date(row.original.fileModifiedAt)

      return format(date, "MM/dd/yyyy - HH:mm:ss")
    },
  },
  {
    accessorKey: "timeStatus",
    header: "Time Status",
    cell: ({ row }) => {
      const date = new Date(row.original.fileModifiedAt)
      const status = getTimeStatus(date)

      return (
        <Badge className={cn("text-sm", FILE_STATUS_STYLES[status])}>
          {FILE_STATUS_LABEL[status]} -{" "}
          {formatDistanceToNow(date, { addSuffix: true })}
        </Badge>
      )
    },
  },
]
