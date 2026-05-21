"use client"

import { type ColumnDef } from "@tanstack/react-table"
import { format, formatDistanceToNow } from "date-fns"
import type { Log } from "@/types/logs"
import { getTimeStatus } from "@/lib/time-status"
import { cn } from "@/lib/utils"
import { Link } from "@tanstack/react-router"
import { Badge } from "./ui/badge"

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
      const ago = formatDistanceToNow(date, { addSuffix: true })

      return (
        <Badge
          className={cn(
            "text-xs",
            status === "up-to-date"
              ? "bg-green-100 text-green-800"
              : status === "delayed"
                ? "bg-yellow-100 text-yellow-800"
                : "bg-red-100 text-red-800"
          )}
        >
          {status === "up-to-date"
            ? "Up to date"
            : status === "delayed"
              ? "Delayed"
              : "Stale"}{" "}
          ({ago})
        </Badge>
      )
    },
  },
]
