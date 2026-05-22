import { env } from "@/env"
import { queryOptions } from "@tanstack/react-query"
import type { Log, LogInfo } from "../schemas/logs"

type LogDTO = {
  file_name: string
  file_modified_at: string
}

type LogInfoDTO = {
  file_modified_at: string
  content: string
}

async function fetchLogs(): Promise<Log[]> {
  const res = await fetch(`${env.VITE_API_URL}/api/logs`)
  if (!res.ok) {
    throw new Error("Failed to fetch logs")
  }
  const data: LogDTO[] = await res.json()
  return data.map((log) => ({
    fileName: log.file_name,
    fileModifiedAt: log.file_modified_at,
  }))
}

async function fetchLogInfo(fileName: string): Promise<LogInfo> {
  const res = await fetch(`${env.VITE_API_URL}/api/logs/${fileName}`)
  if (!res.ok) {
    throw new Error(`Failed to fetch log info for ${fileName}`)
  }
  const data: LogInfoDTO = await res.json()
  return {
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

  info: (fileName: string) =>
    queryOptions({
      queryKey: ["logs", fileName],
      queryFn: () => fetchLogInfo(fileName),
    }),
}
