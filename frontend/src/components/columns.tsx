"use client"

import { type ColumnDef } from "@tanstack/react-table"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { Link } from "@tanstack/react-router"
import { Badge } from "./ui/badge"
import type { Log } from "@/lib/schemas/logs"
import { fileStatusColorMap, sourceColorMap } from "@/lib/color-map"
import { useLogsStore } from "@/store/logs-store"
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip"
import { Edit } from "lucide-react"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<Log>[] = [
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => {
      const title = row.original.title
      return <span className="font-medium">{title}</span>
    },
  },
  {
    accessorKey: "fileName",
    header: "File Name",
    cell: ({ row }) => {
      const logId = row.original.id
      const fileName = row.original.fileName

      return (
        <Link
          className="text-blue-500 hover:text-blue-700 hover:underline"
          to={`/logs/$logId`}
          params={{ logId }}
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
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status

      return (
        <Badge className={cn("text-sm capitalize", fileStatusColorMap[status])}>
          {status}
        </Badge>
      )
    },
  },
  {
    accessorKey: "source",
    header: "Source",
    cell: ({ row }) => {
      const source = row.original.source

      return (
        <Badge className={cn("text-sm capitalize", sourceColorMap[source])}>
          {source}
        </Badge>
      )
    },
  },
  {
    accessorKey: "actions",
    header: () => <span className="flex justify-center">Actions</span>,
    cell: ({ row }) => {
      const log = row.original
      return <ActionCell row={log} />
    },
  },
]

function ActionCell({ row }: { row: Log }) {
  const { openDialog } = useLogsStore()

  return (
    <div className="flex justify-center gap-2">
      <Tooltip>
        <TooltipTrigger onClick={() => openDialog(row.id)}>
          <Edit size={16} />
        </TooltipTrigger>
        <TooltipContent>
          <span>Edit Log</span>
        </TooltipContent>
      </Tooltip>
    </div>
  )
}
