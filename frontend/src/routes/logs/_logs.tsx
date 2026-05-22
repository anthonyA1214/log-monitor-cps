import { createFileRoute, Outlet } from "@tanstack/react-router"

export const Route = createFileRoute("/logs/_logs")({
  loader: () => {
    return { crumb: "Logs" }
  },
  component: LogsLayoutComponent,
})

function LogsLayoutComponent() {
  return <Outlet />
}
