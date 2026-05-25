import { z } from "zod"

export const logSchema = z.object({
  id: z.string(),
  fileName: z.string(),
  fileModifiedAt: z.string(),
})

export const logInfoSchema = z.object({
  id: z.string(),
  fileName: z.string(),
  content: z.string(),
  fileModifiedAt: z.string(),
})

export type Log = z.infer<typeof logSchema>
export type LogInfo = z.infer<typeof logInfoSchema>
