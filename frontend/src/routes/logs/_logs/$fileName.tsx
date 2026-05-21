import { ContentLayout } from "@/components/admin-panel/content-layout"
import { logsQueries } from "@/lib/api/logs"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/logs/_logs/$fileName")({
  loader: ({ context: { queryClient }, params: { fileName } }) => {
    return queryClient.ensureQueryData(logsQueries.info(fileName))
  },
  component: LogsInfoPage,
})

function LogsInfoPage() {
  const fileName = Route.useParams().fileName

  return (
    <ContentLayout title={fileName}>
      {/* place your code here */}
      <p>Info about log file: {fileName}</p>
    </ContentLayout>
  )
}
