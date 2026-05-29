import { z } from "zod"

export const logSchema = z.object({
  id: z.string(),
  title: z.string(),
  fileName: z.string(),
  fileModifiedAt: z.string(),
  source: z.enum(["sync", "manual"]),
})

export const logInfoSchema = z.object({
  id: z.string(),
  title: z.string(),
  fileName: z.string(),
  filePath: z.string(),
  fileModifiedAt: z.string(),
  source: z.enum(["sync", "manual"]),
  content: z.string(),
})

export const addLogSchema = logInfoSchema
  .pick({
    title: true,
    fileName: true,
    filePath: true,
  })
  .extend({
    filePath: z
      .string()
      .min(1, "File path is required")
      .refine((val) => val.split(/[\\/]/).pop()?.endsWith(".txt") ?? false, {
        message: "Only .txt files are allowed",
      }),
  })

export const addLogsSchema = z.object({
  logs: z.array(addLogSchema),
})

export const updateLogInfoSchema = logInfoSchema
  .pick({
    title: true,
    fileName: true,
    filePath: true,
  })
  .extend({
    filePath: z
      .string()
      .min(1, "File path is required")
      .refine((val) => val.split(/[\\/]/).pop()?.endsWith(".txt") ?? false, {
        message: "Only .txt files are allowed",
      }),
  })

export type Log = z.infer<typeof logSchema>
export type LogInfo = z.infer<typeof logInfoSchema>
export type UpdateLogInfo = z.infer<typeof updateLogInfoSchema>
export type AddLogs = z.infer<typeof addLogsSchema>
