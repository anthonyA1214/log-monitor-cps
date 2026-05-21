import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useState } from "react"
import {
  Dropzone,
  DropzoneContent,
  DropzoneEmptyState,
} from "./kibo-ui/dropzone"
import { Button } from "./ui/button"
import { Plus } from "lucide-react"

export default function AddLogDialog() {
  const [files, setFiles] = useState<File[] | undefined>()

  const handleDrop = (files: File[]) => {
    console.log(files)
    setFiles(files)
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary" className="flex items-center gap-2">
          <Plus />
          <span>Add Log</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Import .txt files</DialogTitle>
        </DialogHeader>

        <Dropzone
          accept={{ "text/plain": [".txt"] }}
          maxFiles={10}
          onDrop={handleDrop}
          onError={console.error}
          src={files}
        >
          <DropzoneEmptyState />
          <DropzoneContent />
        </Dropzone>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button type="submit">
            {(files?.length ?? 0) === 0
              ? "Add Log"
              : `Add ${files?.length ?? 0} Log${(files?.length ?? 0) > 1 ? "s" : ""}`}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
