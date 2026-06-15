import { ContentLayout } from "@/components/admin-panel/content-layout"
import LessPriorityPanel from "@/components/dashboard/less-priority-panel"
import OnDemandTable from "@/components/dashboard/on-demand-table"
import PriorityPanel from "@/components/dashboard/priority-panel"
import { createFileRoute } from "@tanstack/react-router"
export const Route = createFileRoute("/dashboard/_dashboard/")({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <ContentLayout>
      <div className="flex h-full flex-col gap-4 lg:flex-row">
        <div className="flex min-w-0 flex-1 flex-col gap-4">
          <PriorityPanel />
          <LessPriorityPanel />
        </div>

        <div className="w-full shrink-0 lg:w-56">
          <OnDemandTable />
        </div>
      </div>
    </ContentLayout>
  )
}
