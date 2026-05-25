import { env } from "@/env"
import { queryOptions } from "@tanstack/react-query"
import type { Log, LogInfo } from "../schemas/logs"

type LogDTO = {
  id: string
  file_name: string
  file_modified_at: string
}

type LogInfoDTO = {
  id: string
  file_name: string
  file_modified_at: string
  content: string
}

async function syncLogs(): Promise<void> {
  const res = await fetch(`${env.VITE_API_URL}/api/logs/sync`, {
    method: "POST",
  });

  if (!res.ok) {
    throw new Error("Failed to sync logs")
  }
}

async function fetchLogs(): Promise<Log[]> {
  const res = await fetch(`${env.VITE_API_URL}/api/logs`)
  if (!res.ok) {
    throw new Error("Failed to fetch logs")
  }
  const data: LogDTO[] = await res.json()
  return data.map((log) => ({
    id: log.id,
    fileName: log.file_name,
    fileModifiedAt: log.file_modified_at,
  }))
}

async function fetchLogInfo(logId: string): Promise<LogInfo> {
  const res = await fetch(`${env.VITE_API_URL}/api/logs/${logId}`)
  if (!res.ok) {
    throw new Error(`Failed to fetch log info for ${logId}`)
  }
  const data: LogInfoDTO = await res.json()
  return {
    id: data.id,
    fileName: data.file_name,
    content: data.content,
    fileModifiedAt: data.file_modified_at,
  }
}

export const logsQueryOptions = {
  all: () =>
    queryOptions({
      queryKey: ["logs"],
      queryFn: fetchLogs,
    }),

  info: (logId: string) =>
    queryOptions({
      queryKey: ["logs", logId],
      queryFn: () => fetchLogInfo(logId),
    }),
}

export { syncLogs }