export type FileStatus = "up-to-date" | "delayed" | "stale"

export function getTimeStatus(dateModified: Date): FileStatus {
  const diffMs = Date.now() - dateModified.getTime()
  const diffMins = diffMs / 1000 / 60

  if (diffMins <= 1) return "up-to-date"
  if (diffMins <= 3) return "delayed"
  return "stale"
}

export const FILE_STATUS_LABEL: Record<FileStatus, string> = {
  "up-to-date": "Up to date",
  delayed: "Delayed",
  stale: "Stale",
}

export const FILE_STATUS_STYLES: Record<FileStatus, string> = {
  "up-to-date": "bg-green-100 text-green-800",
  delayed: "bg-yellow-100 text-yellow-800",
  stale: "bg-red-100 text-red-800",
}
