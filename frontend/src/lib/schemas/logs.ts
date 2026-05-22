import { z } from "zod"

export const logSchema = z.object({
  fileName: z.string(),
  fileModifiedAt: z.string(),
})

export type Log = z.infer<typeof logSchema>
