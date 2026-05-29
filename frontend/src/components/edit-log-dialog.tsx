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
import EditLogFormSkeleton from "./skeletons/edit-log-form-skeleton"

export default function EditLogDialog() {
  const { logId, open, closeDialog } = useLogsStore()
  const { data, isLoading } = useQuery(logsQueryOptions.info(logId!))

  return (
    <Dialog open={open} onOpenChange={closeDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Log</DialogTitle>
        </DialogHeader>

        {isLoading || !data ? <EditLogFormSkeleton /> : <EditLogForm data={data} />}
      </DialogContent>
    </Dialog>
  )
}
