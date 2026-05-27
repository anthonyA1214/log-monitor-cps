import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "./ui/button"
import { Plus } from "lucide-react"
import AddLogForm from "./forms/logs/add-log-form"
import { useState } from "react"

export default function AddLogDialog() {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <Plus />
          <span>Add Log</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Log</DialogTitle>
        </DialogHeader>

        <AddLogForm onSuccess={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  )
}
