import AppDialog from "@/components/app-dialog"
import { columns } from "@/components/columns"
import { DataTable } from "@/components/data-table"
import { logsQueries } from "@/lib/api/logs"
import { useQuery } from "@tanstack/react-query"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/")({
  component: Index,
})

function Index() {
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
          <h2 className="text-2xl font-semibold tracking-tight">File Logs</h2>
        </div>

        {/* table */}
        <DataTable columns={columns} data={data} />
      </div>

      <AppDialog />
    </div>
  )
}
