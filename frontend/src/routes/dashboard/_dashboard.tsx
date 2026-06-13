import { createFileRoute, Outlet } from "@tanstack/react-router"

export const Route = createFileRoute("/dashboard/_dashboard")({
  loader: () => {
    return { crumb: "Dashboard" }
  },
  component: DashboardLayoutComponent,
})

function DashboardLayoutComponent() {
  return <Outlet />
}
