import { ContentLayout } from "@/components/admin-panel/content-layout"
import { logsQueries } from "@/lib/api/logs"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/logs/$fileName")({
  loader: ({ context: { queryClient }, params: { fileName } }) => {
    return queryClient.ensureQueryData(logsQueries.info(fileName))
  },
  component: LogInfoPage,
})

function LogInfoPage() {
  const fileName = Route.useParams().fileName
  return (
    <ContentLayout title="File Log">
      <div>Hello "/logs/{fileName}"!</div>
    </ContentLayout>
  )
}
