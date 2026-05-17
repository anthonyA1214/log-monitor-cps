import { columns } from "./columns"
import { DataTable } from "../components/data-table"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/")({
  component: Index,
})

function Index() {
  const data = [
    {
      id: "1",
      fileName: "log1.txt",
      createdAt: "2024-06-01T12:00:00Z",
      dateModified: "2024-06-01T12:30:00Z",
      timeStatus: "On Time",
    },
    {
      id: "2",
      fileName: "log2.txt",
      createdAt: "2024-06-02T14:30:00Z",
      dateModified: "2024-06-02T15:00:00Z",
      timeStatus: "Late",
    },
    {
      id: "3",
      fileName: "log3.txt",
      createdAt: "2024-06-03T09:15:00Z",
      dateModified: "2024-06-04T10:00:00Z",
      timeStatus: "On Time",
    },
  ]

  // const [time, setTime] = useState(new Date().toLocaleTimeString())

  return (
    <div className="flex min-h-svh flex-col gap-6 p-6">
      {/* stat cards */}
      {/* <div className="grid w-full grid-cols-2 gap-6 lg:grid-cols-4">
        <AppStatCards />
      </div> */}

      {/* table */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold tracking-tight">File Logs</h2>
        </div>
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  )
}
