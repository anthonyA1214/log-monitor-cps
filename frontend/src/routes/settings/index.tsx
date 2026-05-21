import { ContentLayout } from "@/components/admin-panel/content-layout"
import { Button } from "@/components/ui/button"
import { createFileRoute } from "@tanstack/react-router"
import { Input } from "@/components/ui/input"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"

export const Route = createFileRoute("/settings/")({
  component: SettingsPage,
})

function SettingsPage() {
  return (
    <ContentLayout title="Settings">
      <h2 className="text-2Fxl absolute mt-3 font-semibold tracking-tight">
        File Logs
      </h2>
      <div className="m-2 flex flex-row-reverse">
        <Button>Edit</Button>
      </div>
      <FieldGroup className="">
        <Field className="rounded-[10px] bg-gray-200 p-4">
          <FieldLabel htmlFor="file-name">Edit Default Name</FieldLabel>
          <Input
            id="file-name"
            className="border bg-gray-300"
            placeholder="  Input Default File Name"
          />
        </Field>

        <Field className="rounded-[10px] bg-gray-200 p-4">
          <FieldLabel htmlFor="absolute-path">Edit File Path</FieldLabel>
          <Input
            id="absolute-path"
            className="border bg-gray-300"
            placeholder="  Input File Path"
          />
        </Field>
      </FieldGroup>
    </ContentLayout>
  )
}
