import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { logsQueries } from "@/lib/api/logs"
import { useLogsStore } from "@/store/logs-store"
import { useQuery } from "@tanstack/react-query"
import { useEffect, useState } from "react"

export default function AppDialog() {
  const { fileName, setFileName } = useLogsStore()
  const { data, isPending } = useQuery({
    ...logsQueries.detail(fileName ?? ""),
    enabled: !!fileName, // Disable automatic fetching
  })

  const [open, setOpen] = useState(!!fileName)

  useEffect(() => {
    if (fileName) setOpen(true)
  }, [fileName])

  return (
    <Dialog
      open={open}
      onOpenChange={() => {
        setOpen(false)
        setTimeout(() => setFileName(null), 200)
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{fileName}</DialogTitle>
        </DialogHeader>
        <p>
          {isPending
            ? "Loading..."
            : (data?.content ?? "No content available.")}
        </p>
      </DialogContent>
    </Dialog>
  )
}
