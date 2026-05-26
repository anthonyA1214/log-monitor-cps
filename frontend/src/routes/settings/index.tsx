import { ContentLayout } from "@/components/admin-panel/content-layout"
import { createFileRoute } from "@tanstack/react-router"
import { settingsQueryOptions } from "@/lib/api/settings"
import { useSuspenseQuery } from "@tanstack/react-query"
import SettingsForm from "../../components/forms/settings/settings-form"

export const Route = createFileRoute("/settings/")({
  loader: ({ context: { queryClient } }) => {
    queryClient.ensureQueryData(settingsQueryOptions.all())
    return { crumb: "Settings" }
  },
  errorComponent: () => <div>Failed to load settings</div>,
  component: SettingsPage,
})

function SettingsPage() {
  const { data } = useSuspenseQuery(settingsQueryOptions.all())

  return (
    <ContentLayout>
      <div className="flex flex-col">
        <h2 className="text-2xl font-semibold tracking-tight">Settings Page</h2>
        <span className="text-sm text-muted-foreground">
          This is the settings page. You can edit your settings here.
        </span>
      </div>

      <SettingsForm data={data} />
    </ContentLayout>
  )
}
