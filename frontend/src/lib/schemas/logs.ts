import { z } from "zod"

export const logSchema = z.object({
  fileName: z.string(),
  fileModifiedAt: z.string(),
})

export const logInfoSchema = z.object({
  content: z.string(),
  fileModifiedAt: z.string(),
})

export type Log = z.infer<typeof logSchema>
export type LogInfo = z.infer<typeof logInfoSchema>
