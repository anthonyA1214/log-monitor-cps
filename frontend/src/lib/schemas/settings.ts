import { z } from "zod"

export const settingsSchema = z.object({
  logsDirectory: z.string().min(1, "Logs directory is required"),
  commonPrefix: z.string().optional(),
})

export type Settings = z.infer<typeof settingsSchema>
