import { env } from "@/env"
import { infiniteQueryOptions, queryOptions } from "@tanstack/react-query"
import type { AddLogs, Log, LogContent, LogInfo } from "../schemas/logs"

type LogDTO = {
  id: string
  title: string
  file_name: string
  file_modified_at: string
  source: "sync" | "manual"
  status: "active" | "inactive"
  children?: LogDTO[]
}

type LogInfoDTO = {
  id: string
  title: string
  file_name: string
  file_path: string
  file_modified_at: string
  source: "sync" | "manual"
  status: "active" | "inactive"
}

type LogContentDTO = {
  content: string;
  offset: number;
  next_offset: number;
  has_more: boolean;
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
    source: log.source,
    status: log.status,
    children: log.children?.map((child) => ({
      id: child.id,
      title: child.title,
      fileName: child.file_name,
      fileModifiedAt: child.file_modified_at,
      source: child.source,
      status: child.status,
    })) ?? [],
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
    source: data.source,
    status: data.status,
  }
}

async function fetchLogContent(logId: string, offset?: number): Promise<LogContent> {
  const url = new URL(`${env.VITE_API_URL}/api/logs/${logId}/content`)
  if (offset !== undefined) {
    url.searchParams.set("offset", String(offset))
  }

  const res = await fetch(url.toString())
  if (!res.ok) {
    throw new Error(`Failed to fetch log content for ${logId}`);
  }

  const data: LogContentDTO = await res.json()
  return {
    content: data.content,
    offset: data.offset,
    nextOffset: data.next_offset,
    hasMore: data.has_more,
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
    source: log.source,
    status: log.status,
    children: log.children?.map((child) => ({
      id: child.id,
      title: child.title,
      fileName: child.file_name,
      fileModifiedAt: child.file_modified_at,
      source: child.source,
      status: child.status,
    })) ?? [],
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
    source: data.source,
    status: data.status,
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

  content: (logId: string) =>
    infiniteQueryOptions({
      queryKey: ["logs", logId, "content"],
      queryFn: ({ pageParam }: { pageParam: number | undefined }) =>
        fetchLogContent(logId, pageParam),
      initialPageParam: undefined as number | undefined,
      getNextPageParam: (last) =>
        last.hasMore ? last.nextOffset : undefined,
      getPreviousPageParam: (first) =>
        first.offset > 0 ? Math.max(0, first.offset - 10 * 1024 * 1024) : undefined,
    }),
}

export { syncLogs, updateLogInfo, addLogs }
