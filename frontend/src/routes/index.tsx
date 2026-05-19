import AddLogDialog from "@/components/add-log-dialog"
import { columns } from "@/components/columns"
import { DataTable } from "@/components/data-table"
import { useMilitaryTime } from "@/hooks/use-military-time"
import { logsQueries } from "@/lib/api/logs"
import { useQuery } from "@tanstack/react-query"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/")({
  component: Index,
})

function Index() {
  const time = useMilitaryTime()
  const { data, isPending } = useQuery({
    ...logsQueries.all(),
    initialData: [],
    refetchInterval: 5000, // Refetch every 5 seconds
  })

  if (isPending) return <p>Loading...</p>

  return (
    <div className="flex min-h-svh flex-col gap-6 p-6">
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

            <AddLogDialog />
          </div>
        </div>

        {/* table */}
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  )
}
