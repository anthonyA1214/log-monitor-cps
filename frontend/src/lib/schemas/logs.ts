import { z } from "zod"

export const logSchema = z.object({
  id: z.string(),
  title: z.string(),
  fileName: z.string(),
  fileModifiedAt: z.string(),
})

export const logInfoSchema = z.object({
  id: z.string(),
  title: z.string(),
  fileName: z.string(),
  filePath: z.string(),
  fileModifiedAt: z.string(),
  content: z.string(),
})

export const updateLogInfoSchema = logInfoSchema
  .pick({
    title: true,
    fileName: true,
    filePath: true,
  })
  .extend({
    fileName: z.string().min(1, "File name is required"),
    filePath: z.string().min(1, "File path is required"),
  })
  .refine((data) => data.fileName.endsWith(".txt"), {
    message: "Only .txt files are allowed",
    path: ["fileName"],
  })

export type Log = z.infer<typeof logSchema>
export type LogInfo = z.infer<typeof logInfoSchema>
export type UpdateLogInfo = z.infer<typeof updateLogInfoSchema>
