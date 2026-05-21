import { ContentLayout } from "@/components/admin-panel/content-layout"
import { columns } from "@/components/columns"
import { DataTable } from "@/components/data-table"
import { useMilitaryTime } from "@/hooks/use-military-time"
import { logsQueries } from "@/lib/api/logs"
import { useSuspenseQuery } from "@tanstack/react-query"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/logs/_logs/")({
  loader: ({ context: { queryClient } }) => {
    return queryClient.ensureQueryData(logsQueries.all())
  },
  errorComponent: ({ error }) => (
    <div className="flex min-h-svh items-center justify-center">
      <p className="text-muted-foreground">{error.message}</p>
    </div>
  ),
  component: LogsPage,
})

function LogsPage() {
  const time = useMilitaryTime()
  const { data = [] } = useSuspenseQuery({
    ...logsQueries.all(),
    refetchInterval: 5000, // Refetch every 5 seconds
  })

  return (
    <ContentLayout title="Logs">
      <div className="flex flex-col gap-4">
        {/* header */}
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <h2 className="text-2xl font-semibold tracking-tight">File Logs</h2>
            <span className="text-sm text-muted-foreground">
              {data.length} total logs
            </span>
          </div>

          {/* military time */}
          <div className="flex items-center gap-2">
            <span className="font-mono text-sm text-muted-foreground">
              {time}
            </span>

            {/* <AddLogDialog /> */}
          </div>
        </div>

        {/* table */}
        <DataTable columns={columns} data={data} />
      </div>
    </ContentLayout>
  )
}
