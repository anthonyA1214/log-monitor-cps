import { createRootRoute, Outlet } from "@tanstack/react-router"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import AdminPanelLayout from "@/components/admin-panel/admin-panel-layout"

const queryClient = new QueryClient()

export const Route = createRootRoute({
  component: RootLayout,
})

function RootLayout() {
  return (
    <AdminPanelLayout>
      <QueryClientProvider client={queryClient}>
        <Outlet />
      </QueryClientProvider>
    </AdminPanelLayout>
  )
}
