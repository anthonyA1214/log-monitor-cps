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

  const [cached, setCached] = useState<{
    fileName: string
    content: string
  } | null>(null)

  useEffect(() => {
    if (fileName && data?.content) {
      setCached({ fileName, content: data.content })
    } else if (fileName) {
      setCached(null)
    }
  }, [fileName, data?.content])

  return (
    <Dialog
      open={!!fileName}
      onOpenChange={(open) => !open && setFileName(null)}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{cached?.fileName}</DialogTitle>
        </DialogHeader>
        <p>{fileName && isPending ? "Loading..." : cached?.content ?? "No content available."}</p>
      </DialogContent>
    </Dialog>
  )
}
