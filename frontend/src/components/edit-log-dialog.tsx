import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useLogsStore } from "@/store/logs-store"
import { logsQueryOptions } from "@/lib/api/logs"
import { useQuery } from "@tanstack/react-query"
import EditLogForm from "./forms/logs/edit-log-form"
import { Spinner } from "./ui/spinner"

export default function EditLogDialog() {
  const { logId, open, closeDialog } = useLogsStore()
  const { data, isLoading } = useQuery(logsQueryOptions.info(logId!))

  return (
    <Dialog open={open} onOpenChange={closeDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Log</DialogTitle>
        </DialogHeader>

        {isLoading || !data ? <Spinner /> : <EditLogForm data={data} />}
      </DialogContent>
    </Dialog>
  )
}
