import { env } from "@/env"
import type { Settings } from "../schemas/settings"

type SettingsDTO = {
  logs_directory: string
}

async function fetchSettings(): Promise<Settings> {
  const res = await fetch(`${env.VITE_API_URL}/api/settings`)

  if (!res.ok) {
    throw new Error("Failed to fetch settings")
  }

  const data: SettingsDTO = await res.json()

  return {
    logsDirectory: data.logs_directory,
  }
}

async function updateSettings(settings: Settings): Promise<Settings> {
  const res = await fetch(`${env.VITE_API_URL}/api/settings`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      logs_directory: settings.logsDirectory,
    }),
  })

  if (!res.ok) {
    throw new Error("Failed to update settings")
  }

  const data: SettingsDTO = await res.json()

  return {
    logsDirectory: data.logs_directory,
  }
}

export const settingsQueryOptions = {
  all: () => ({
    queryKey: ["settings"],
    queryFn: fetchSettings,
  }),
}

export { updateSettings }
