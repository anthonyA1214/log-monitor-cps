import { z } from "zod"

export const logSchema = z.object({
  id: z.string(),
  title: z.string(),
  fileName: z.string(),
  fileModifiedAt: z.string(),
  source: z.enum(["sync", "manual"]),
  status: z.string(),
  get children() {
    return z.array(logSchema).optional()
  },
})

export const logInfoSchema = logSchema
  .omit({
    children: true,
  })
  .extend({
    filePath: z.string(),
  })

export const logContentSchema = z.object({
  content: z.string(),
  offset: z.number(),
  nextOffset: z.number(),
  hasMore: z.boolean(),
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
export type LogContent = z.infer<typeof logContentSchema>
export type UpdateLogInfo = z.infer<typeof updateLogInfoSchema>
export type AddLogs = z.infer<typeof addLogsSchema>
