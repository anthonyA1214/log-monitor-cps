import { columns } from "./columns"
import { DataTable } from "./components/data-table"
import AppStatCards from "./components/app-stat-cards"

export function App() {
  const data = [
    {
      id: "1",
      fileName: "log1.txt",
      createdAt: "2024-06-01T12:00:00Z",
      department: "IT",
      timeStatus: "On Time",
    },
    {
      id: "2",
      fileName: "log2.txt",
      createdAt: "2024-06-02T14:30:00Z",
      department: "HR",
      timeStatus: "Late",
    },
    {
      id: "3",
      fileName: "log3.txt",
      createdAt: "2024-06-03T09:15:00Z",
      department: "Finance",
      timeStatus: "On Time",
    },
  ]

  return (
    <div className="flex min-h-svh flex-col gap-6 p-6">
      {/* stat cards */}
      <div className="grid w-full grid-cols-2 gap-6 lg:grid-cols-4">
        <AppStatCards />
      </div>

      {/* table */}
      <DataTable columns={columns} data={data} />
    </div>
  )
}

export default App
