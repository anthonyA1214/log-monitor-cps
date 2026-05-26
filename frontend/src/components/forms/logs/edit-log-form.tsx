import { Button } from "@/components/ui/button"
import { DialogClose, DialogFooter } from "@/components/ui/dialog"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { logsQueryOptions, updateLogInfo } from "@/lib/api/logs"
import {
  updateLogInfoSchema,
  type LogInfo,
  type UpdateLogInfo,
} from "@/lib/schemas/logs"
import { useLogsStore } from "@/store/logs-store"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

interface EditLogFormProps {
  data: LogInfo
}

export default function EditLogForm({ data }: EditLogFormProps) {
  const queryClient = useQueryClient()
  const { closeDialog } = useLogsStore()

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isDirty },
  } = useForm<UpdateLogInfo>({
    resolver: zodResolver(updateLogInfoSchema),
    defaultValues: data,
    mode: "onTouched",
  })

  const { mutate, isPending } = useMutation({
    mutationFn: (formData: UpdateLogInfo) => updateLogInfo(data.id, formData),
    onSuccess: (updatedLogInfo) => {
      queryClient.setQueryData(
        logsQueryOptions.info(updatedLogInfo.id).queryKey,
        updatedLogInfo
      )
      queryClient.invalidateQueries({
        queryKey: logsQueryOptions.all().queryKey,
      })
      reset(updatedLogInfo)
      toast.success("Log info updated successfully")
      closeDialog()
    },
    onError: () => {
      toast.error("Failed to update log info")
    },
  })

  const onSubmit = (formData: UpdateLogInfo) => {
    mutate(formData)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} id="edit-log-form">
      <FieldGroup>
        {/* Title */}
        <Field data-invalid={!!errors.title}>
          <FieldLabel htmlFor="title">Title</FieldLabel>
          <Input
            {...register("title")}
            aria-invalid={!!errors.title}
            id="title"
            placeholder="e.g., My App Log"
            type="text"
          />
          <FieldDescription>
            The title of the log entry (e.g., <code>My App Log</code>).
          </FieldDescription>
          {errors.title && <FieldError>{errors.title.message}</FieldError>}
        </Field>

        {/* File Path */}
        <Field data-invalid={!!errors.filePath}>
          <FieldLabel htmlFor="file-path">File Path</FieldLabel>
          <Input
            {...register("filePath")}
            aria-invalid={!!errors.filePath}
            id="file-path"
            placeholder="e.g., /var/log/myapp.txt"
            type="text"
            onChange={(e) => {
              setValue("filePath", e.target.value, { shouldDirty: true })
              const fileName = e.target.value.split(/[\\/]/).pop() || ""
              setValue("fileName", fileName, { shouldDirty: true })
            }}
          />
          <FieldDescription>
            The path to the log file (e.g., <code>/var/log/myapp.txt</code>).
          </FieldDescription>
          {errors.filePath && (
            <FieldError>{errors.filePath.message}</FieldError>
          )}
        </Field>

        {/* File Name */}
        <Field data-invalid={!!errors.fileName}>
          <FieldLabel htmlFor="file-name">File Name</FieldLabel>
          <Input
            {...register("fileName")}
            aria-invalid={!!errors.fileName}
            id="file-name"
            placeholder="e.g., myapp.txt"
            type="text"
            disabled
          />
          <FieldDescription>
            The name of the log file (e.g., <code>myapp.txt</code>).
          </FieldDescription>
          {errors.fileName && (
            <FieldError>{errors.fileName.message}</FieldError>
          )}
        </Field>
      </FieldGroup>

      <DialogFooter>
        <DialogClose asChild>
          <Button variant="outline">Cancel</Button>
        </DialogClose>
        <Button type="submit" disabled={isPending || !isDirty}>
          {isPending ? "Saving..." : "Save Changes"}
        </Button>
      </DialogFooter>
    </form>
  )
}
