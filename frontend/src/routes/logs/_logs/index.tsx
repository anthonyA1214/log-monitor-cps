import AddLogDialog from "@/components/add-log-dialog"
import { ContentLayout } from "@/components/admin-panel/content-layout"
import { columns } from "@/components/columns"
import { DataTable } from "@/components/data-table"
import { useMilitaryTime } from "@/hooks/use-military-time"
import { logsQueryOptions } from "@/lib/api/logs"
import { useSuspenseQuery } from "@tanstack/react-query"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/logs/_logs/")({
  loader: ({ context: { queryClient } }) => {
    return queryClient.ensureQueryData(logsQueryOptions.all())
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
    ...logsQueryOptions.all(),
    refetchInterval: 5000, // Refetch every 5 seconds
  })

  return (
    <ContentLayout>
      <div className="flex h-full min-h-0 flex-col gap-4">
        {/* header */}
        <div className="flex flex-col">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold tracking-tight">Logs Page</h2>

            <div className="flex items-center gap-2">
              {/* military time */}
              <span className="font-mono text-sm text-muted-foreground">
                {time}
              </span>
              <AddLogDialog />
            </div>
          </div>

          <span className="text-sm text-muted-foreground">
            View and monitor your application logs in real-time.
          </span>
        </div>

        {/* table */}
        <DataTable columns={columns} data={data} />
      </div>
    </ContentLayout>
  )
}
