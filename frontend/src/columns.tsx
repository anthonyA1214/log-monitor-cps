"use client"

import { type ColumnDef } from "@tanstack/react-table"
import { format } from "date-fns";
import AppDialog from "./components/app-dialog";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Log = {
  id: string
  fileName: string
  createdAt: string
  department: string
  timeStatus: string
}

export const columns: ColumnDef<Log>[] = [
  {
    accessorKey: "fileName",
    header: "File Name",
    cell: ({ row }) => {
        const fileName = row.original.fileName;

        return (
            <AppDialog fileName={fileName} content={`Content of ${fileName}`} />
        )
    }
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => {
        const date = new Date(row.original.createdAt);

        return format(date, "dd/MM/yyyy - HH:mm:ss");
    }
  },
  {
    accessorKey: "department",
    header: "Department",
  },
  {
    accessorKey: "timeStatus",
    header: "Time Status",
  },
]
