import { ContentLayout } from "@/components/admin-panel/content-layout"
import { logsQueryOptions } from "@/lib/api/logs"
import { createFileRoute, Link } from "@tanstack/react-router"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { useSuspenseQuery } from "@tanstack/react-query"

export const Route = createFileRoute("/logs/_logs/$fileName")({
  loader: ({ context: { queryClient }, params: { fileName } }) => {
    queryClient.ensureQueryData(logsQueryOptions.info(fileName))
    return { crumb: fileName }
  },
  component: LogsInfoPage,
})

function LogsInfoPage() {
  const fileName = Route.useParams().fileName
  const { data } = useSuspenseQuery(logsQueryOptions.info(fileName))

  return (
    <ContentLayout>
      <div className="flex flex-col gap-4">
        <Link to="/logs">
          <Button className="w-fit">
            <ArrowLeft />
            <span>Back to Logs</span>
          </Button>
        </Link>

        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <h3>{fileName}</h3>
          </div>
        </div>
      </div>
    </ContentLayout>
  )
}
