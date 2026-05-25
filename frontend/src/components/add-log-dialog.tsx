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
import { Plus, Trash2 } from "lucide-react"

interface LogEntry {
  customName: string
  fileName: string
  file: File
}

export default function AddLogDialog() {
  const [entries, setEntries] = useState<LogEntry[]>([])

  const handleDrop = (dropped: File[]) => {
    const newEntries = dropped
      .filter((f) => !entries.some((e) => e.fileName === f.name))
      .map((f) => ({
        customName: f.name.replace(/\.txt$/i, ""),
        fileName: f.name,
        file: f,
      }))
    setEntries((prev) => [...prev, ...newEntries])
  }

  const handleNameChange = (index: number, value: string) => {
    setEntries((prev) =>
      prev.map((e, i) => (i === index ? { ...e, customName: value } : e))
    )
  }

  const handleRemove = (index: number) => {
    setEntries((prev) => prev.filter((_, i) => i !== index))
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary" className="flex items-center gap-2">
          <Plus />
          <span>Add Log</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Import .txt files</DialogTitle>
        </DialogHeader>

        <Dropzone
          accept={{ "text/plain": [".txt"] }}
          maxFiles={10}
          onDrop={handleDrop}
          onError={console.error}
          src={entries.map((e) => e.file)}
        >
          <DropzoneEmptyState />
          <DropzoneContent />
        </Dropzone>

        {entries.length > 0 && (
          <div className="overflow-hidden rounded-xl border border-gray-200">
            <div className="grid grid-cols-[1fr_1fr_auto] border-b border-gray-200 bg-gray-50 px-4 py-2">
              <span className="text-xs font-semibold text-gray-500">Custom Name</span>
              <span className="text-xs font-semibold text-gray-500">File Name</span>
              <span className="w-8" />
            </div>
            <div className="max-h-48 divide-y divide-gray-100 overflow-y-auto bg-white">
              {entries.map((entry, index) => (
                <div
                  key={`${entry.fileName}-${index}`}
                  className="grid grid-cols-[1fr_1fr_auto] items-center gap-2 px-4 py-2"
                >
                  <input
                    type="text"
                    value={entry.customName}
                    onChange={(e) => handleNameChange(index, e.target.value)}
                    className="w-full rounded-md border border-gray-200 px-2 py-1 text-sm outline-none focus:ring-2 focus:ring-gray-400"
                  />
                  <span className="truncate text-sm text-gray-500">
                    {entry.fileName}
                  </span>
                  <button
                    onClick={() => handleRemove(index)}
                    className="flex h-7 w-7 items-center justify-center rounded-lg text-gray-400 transition-colors hover:bg-red-50 hover:text-red-500"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button type="submit" disabled={entries.length === 0}>
            {entries.length === 0
              ? "Add Log"
              : `Add ${entries.length} Log${entries.length > 1 ? "s" : ""}`}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}