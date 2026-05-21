import { createFileRoute, Outlet } from "@tanstack/react-router"

export const Route = createFileRoute("/logs/_logs")({
  component: LogsLayoutComponent,
})

function LogsLayoutComponent() {
  return <Outlet />
}
