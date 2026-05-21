import {
  createRootRouteWithContext,
  Link,
  Outlet,
} from "@tanstack/react-router"
import { type QueryClient } from "@tanstack/react-query"
import AdminPanelLayout from "@/components/admin-panel/admin-panel-layout"

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()(
  {
    component: RootComponent,
    notFoundComponent: () => {
      return (
        <div className="flex h-screen w-full flex-col items-center justify-center overflow-hidden">
          <p>This is the notFoundComponent configured on root route</p>
          <Link to="/logs">Start Over</Link>
        </div>
      )
    },
  }
)

function RootComponent() {
  return (
    <AdminPanelLayout>
      <Outlet />
    </AdminPanelLayout>
  )
}
