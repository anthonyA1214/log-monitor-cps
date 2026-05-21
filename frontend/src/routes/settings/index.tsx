import { ContentLayout } from "@/components/admin-panel/content-layout"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/settings/")({
  component: SettingsPage,
})

function SettingsPage() {
  return (
    <ContentLayout title="Settings">
      <div>Hello "/settings/"!</div>
    </ContentLayout>
  )
}
