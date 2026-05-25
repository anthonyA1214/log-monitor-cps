import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useState, useRef } from "react"
import { Button } from "./ui/button"
import { Plus, Trash2, FolderOpen } from "lucide-react"

interface LogEntry {
  customName: string
  fileName: string
  filePath: string
  file: File
}

export default function AddLogDialog() {
  const [entries, setEntries] = useState<LogEntry[]>([])
  const [pendingFile, setPendingFile] = useState<File | null>(null)
  const [pendingPath, setPendingPath] = useState("")
  const [pendingName, setPendingName] = useState("")
  const [errors, setErrors] = useState<Record<string, string>>({})
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setPendingFile(file)
    setErrors((prev) => ({ ...prev, file: "" }))
    e.target.value = ""
  }

  const validate = () => {
    const newErrors: Record<string, string> = {}
    if (!pendingFile) newErrors.file = "Please select a .txt file"
    if (!pendingPath.trim()) newErrors.path = "Please enter an absolute path"
    if (!pendingName.trim()) newErrors.name = "Please enter a custom name"
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleAdd = () => {
    if (!validate()) return
    setEntries((prev) => [
      ...prev,
      {
        customName: pendingName.trim(),
        fileName: pendingFile!.name,
        filePath: pendingPath.trim(),
        file: pendingFile!,
      },
    ])
    setPendingFile(null)
    setPendingPath("")
    setPendingName("")
    setErrors({})
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

        {/* Input form */}
        <div className="flex flex-col gap-3 rounded-xl border border-gray-200 bg-gray-50 p-4">
          {/* File picker */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-gray-500">Text File</label>
            <div className="flex items-center gap-2">
              <input
                ref={fileInputRef}
                type="file"
                accept=".txt"
                className="hidden"
                onChange={handleFileSelect}
              />
              <Button
                type="button"
                variant="outline"
                className="flex shrink-0 items-center gap-2 text-sm"
                onClick={() => fileInputRef.current?.click()}
              >
                <FolderOpen className="h-4 w-4" />
                Browse
              </Button>
              <span className={`truncate text-sm ${pendingFile ? "text-gray-700" : "text-gray-400"}`}>
                {pendingFile ? pendingFile.name : "No file selected"}
              </span>
            </div>
            {errors.file && (
              <p className="text-xs text-red-500">{errors.file}</p>
            )}
          </div>

          {/* Absolute path */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-gray-500">Absolute Path</label>
            <input
              type="text"
              value={pendingPath}
              onChange={(e) => {
                setPendingPath(e.target.value)
                setErrors((prev) => ({ ...prev, path: "" }))
              }}
              placeholder="e.g. C:\logs\app.txt"
              className={`rounded-md border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-gray-400 ${
                errors.path ? "border-red-400" : "border-gray-200"
              }`}
            />
            {errors.path && (
              <p className="text-xs text-red-500">{errors.path}</p>
            )}
          </div>

          {/* Custom name */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-gray-500">Custom Name</label>
            <input
              type="text"
              value={pendingName}
              onChange={(e) => {
                setPendingName(e.target.value)
                setErrors((prev) => ({ ...prev, name: "" }))
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleAdd()
              }}
              placeholder="e.g. Production Error Log"
              className={`rounded-md border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-gray-400 ${
                errors.name ? "border-red-400" : "border-gray-200"
              }`}
            />
            {errors.name && (
              <p className="text-xs text-red-500">{errors.name}</p>
            )}
          </div>

          <Button
            type="button"
            onClick={handleAdd}
            className="self-end"
          >
            <Plus className="mr-1 h-4 w-4" />
            Add to list
          </Button>
        </div>

        {/* File table */}
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
                  key={`${entry.filePath}-${index}`}
                  className="grid grid-cols-[1fr_1fr_auto] items-center gap-2 px-4 py-2"
                >
                  <span className="truncate text-sm font-medium text-gray-800">
                    {entry.customName}
                  </span>
                  <span className="truncate text-sm text-gray-500" title={entry.filePath}>
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