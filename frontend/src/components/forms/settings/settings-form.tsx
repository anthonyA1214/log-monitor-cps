import { Input } from "@/components/ui/input"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field"
import { Button } from "@/components/ui/button"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { settingsSchema, type Settings } from "@/lib/schemas/settings"
import { zodResolver } from "@hookform/resolvers/zod"
import { settingsQueryOptions, updateSettings } from "@/lib/api/settings"
import { toast } from "sonner"

interface SettingsFormProps {
  data: Settings
}

export default function SettingsForm({ data }: SettingsFormProps) {
  const queryClient = useQueryClient()
  const [isEditing, setIsEditing] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Settings>({
    resolver: zodResolver(settingsSchema),
    defaultValues: data,
    mode: "onTouched",
  })

  const { mutate, isPending } = useMutation({
    mutationFn: updateSettings,
    onSuccess: (updatedSettings) => {
      queryClient.setQueryData(
        settingsQueryOptions.all().queryKey,
        updatedSettings
      )
      setIsEditing(false)
      toast.success("Settings updated successfully")
    },
    onError: () => {
      toast.error("Failed to update settings")
    },
  })

  const handleCancel = () => {
    reset()
    setIsEditing(false)
  }

  const onSubmit = (formData: Settings) => {
    mutate(formData)
  }

  return (
    <>
      <div className="flex items-center justify-end gap-2">
        {isEditing && (
          <Button variant="ghost" onClick={handleCancel} disabled={isPending}>
            Cancel
          </Button>
        )}
        {isEditing ? (
          <Button
            type="submit"
            onClick={handleSubmit(onSubmit)}
            disabled={isPending}
          >
            {isPending ? "Saving..." : "Save"}
          </Button>
        ) : (
          <Button type="button" onClick={() => setIsEditing(true)}>
            Edit
          </Button>
        )}
      </div>
      <FieldGroup>
        {/* Logs Directory */}
        <Field data-invalid={!!errors.logsDirectory}>
          <FieldLabel htmlFor="absolute-path">Absolute Path</FieldLabel>
          <Input
            {...register("logsDirectory")}
            aria-invalid={!!errors.logsDirectory}
            id="absolute-path"
            placeholder="e.g., /var/log/myapp"
            defaultValue={data.logsDirectory}
            disabled={!isEditing}
          />
          <FieldDescription>
            Must be a full path starting from the root (e.g.,{" "}
            <code>/var/log/myapp</code>), not a relative path like{" "}
            <code>./logs</code>.
          </FieldDescription>
          {errors.logsDirectory && (
            <FieldError>{errors.logsDirectory.message}</FieldError>
          )}
        </Field>

        <FieldSeparator />

        {/* Common Prefix */}
        <Field data-invalid={!!errors.commonPrefix}>
          <FieldLabel htmlFor="file-name">Common Prefix</FieldLabel>
          <Input
            {...register("commonPrefix")}
            aria-invalid={!!errors.commonPrefix}
            id="common-prefix"
            placeholder="e.g., error-, access_, log."
            disabled={!isEditing}
          />
          <FieldDescription>
            A common prefix to filter log files (e.g., <code>error_</code> for
            files like <code>error_01-05-2026.txt</code>). Separate multiple
            prefixes with a comma. If left empty, all <code>.txt</code> files in
            the directory will be detected.
          </FieldDescription>
          {errors.commonPrefix && (
            <FieldError>{errors.commonPrefix.message}</FieldError>
          )}
        </Field>
      </FieldGroup>
    </>
  )
}
