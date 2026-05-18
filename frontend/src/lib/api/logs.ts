import { env } from "@/env"
import type { Log } from "@/types/logs"
import { queryOptions } from "@tanstack/react-query"

type RawLog = {
  file_name: string
  date_modified: string
}

async function fetchLogs(): Promise<Log[]> {
  const res = await fetch(`${env.VITE_API_URL}/api/logs`)
  if (!res.ok) {
    throw new Error("Failed to fetch logs")
  }
  const data: RawLog[] = await res.json()
  return data.map((log) => ({
    fileName: log.file_name,
    dateModified: log.date_modified,
  }))
}

async function fetchLogDetail(fileName: string): Promise<{ content: string }> {
  const res = await fetch(`${env.VITE_API_URL}/api/logs/${fileName}`)
  if (!res.ok) {
    throw new Error(`Failed to fetch log detail for ${fileName}`)
  }
  const data: { content: string } = await res.json()
  return {
    content: data.content,
  }
}

export const logsQueries = {
  all: () =>
    queryOptions({
      queryKey: ["logs"],
      queryFn: fetchLogs,
    }),

  detail: (fileName: string) =>
    queryOptions({
      queryKey: ["logs", fileName],
      queryFn: () => fetchLogDetail(fileName),
    }),
}
