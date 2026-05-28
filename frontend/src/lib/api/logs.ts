import { env } from "@/env"
import { queryOptions } from "@tanstack/react-query"
import type { AddLogs, Log, LogInfo } from "../schemas/logs"

type LogDTO = {
  id: string
  title: string
  file_name: string
  file_modified_at: string
}

type LogInfoDTO = {
  id: string
  title: string
  file_name: string
  file_path: string
  file_modified_at: string
  content: string
}

async function syncLogs(): Promise<void> {
  const res = await fetch(`${env.VITE_API_URL}/api/logs/sync`, {
    method: "POST",
  })

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
    title: log.title,
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
    title: data.title,
    fileName: data.file_name,
    filePath: data.file_path,
    fileModifiedAt: data.file_modified_at,
    content: data.content,
  }
}

async function addLogs(data: AddLogs): Promise<Log[]> {
  const res = await fetch(`${env.VITE_API_URL}/api/logs`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(
      data.logs.map((log) => ({
        title: log.title,
        file_name: log.fileName,
        file_path: log.filePath,
      }))
    ),
  })

  const result = await res.json()

  if (!res.ok) {
    throw result
  }

  const logsData: LogDTO[] = Array.isArray(result.logs)
    ? result.logs
    : [result.logs]
  return logsData.map((log) => ({
    id: log.id,
    title: log.title,
    fileName: log.file_name,
    fileModifiedAt: log.file_modified_at,
  }))
}

async function updateLogInfo(
  logId: string,
  info: Partial<LogInfo>
): Promise<LogInfo> {
  const res = await fetch(`${env.VITE_API_URL}/api/logs/${logId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: info.title,
      file_name: info.fileName,
      file_path: info.filePath,
    }),
  })
  if (!res.ok) {
    throw new Error(`Failed to update log info for ${logId}`)
  }

  const data: LogInfoDTO = await res.json()
  return {
    id: data.id,
    title: data.title,
    fileName: data.file_name,
    filePath: data.file_path,
    fileModifiedAt: data.file_modified_at,
    content: data.content,
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

export { syncLogs, updateLogInfo, addLogs }
