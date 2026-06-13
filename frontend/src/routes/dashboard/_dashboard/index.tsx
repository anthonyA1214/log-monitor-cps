import { ContentLayout } from "@/components/admin-panel/content-layout"
import { createFileRoute } from "@tanstack/react-router"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableRow, TableCell } from "@/components/ui/table"

// ─── Types ───────────────────────────────────────────────────────────────────

type PriorityCard = {
  cardTitle: string
  fetching: string
  fetchingBGColor: string
  color: string
  lastRun?: null
}

type OnDemandSideTable = {
  title: string
  lastRun: null // dito pakipaltan
}

const priorityCards: PriorityCard[] = [
  {
    cardTitle: "Automatic Aired",
    fetching: "Daily",
    fetchingBGColor: "#FFFFFF",
    color: "#22c55e",
    lastRun: null,
  },
  {
    cardTitle: "Win Media Schedule",
    fetching: "Daily",
    fetchingBGColor: "#FFFFFF",
    color: "#22c55e",
    lastRun: null,
  },
  {
    cardTitle: "SV Sync",
    fetching: "Daily",
    fetchingBGColor: "#FFFFFF",
    color: "#22c55e",
    lastRun: null,
  },
  {
    cardTitle: "OR Sync",
    fetching: "Recursive",
    fetchingBGColor: "#FFFFFF",
    color: "#f97316",
    lastRun: null,
  },
]

const lessPriorityCards: PriorityCard[] = [
  {
    cardTitle: "WM Sync",
    fetching: "Daily",
    fetchingBGColor: "#FFFFFF",
    color: "#60a5fa",
    lastRun: null,
  },
  {
    cardTitle: "WM Compare",
    fetching: "Daily",
    fetchingBGColor: "#FFFFFF",
    color: "#60a5fa",
    lastRun: null,
  },
  {
    cardTitle: "IM Header",
    fetching: "Recursive",
    fetchingBGColor: "#FFFFFF",
    color: "#f97316",
    lastRun: null,
  },
  {
    cardTitle: "IM Detail",
    fetching: "Recursive",
    fetchingBGColor: "#FFFFFF",
    color: "#22c55e",
    lastRun: null,
  },
]

const onDemandSideTable: OnDemandSideTable[] = [
  { title: "Artrade", lastRun: null },
  { title: "Audit", lastRun: null },
  { title: "Ledger", lastRun: null },
]

function JobCard({
  cardTitle,
  fetching,
  fetchingBGColor,
  color,
  lastRun,
}: PriorityCard) {
  return (
    <Card className="flex flex-col gap-2 rounded-xl border p-4">
      <div className="flex items-center justify-between">
        <span
          className="rounded-full px-2 py-0.5 text-[10px] font-semibold tracking-widest uppercase"
          style={{ backgroundColor: fetchingBGColor + "55", color }}
        >
          {fetching}
        </span>
        <span
          className="h-2 w-2 rounded-full"
          style={{ backgroundColor: color }}
        />
      </div>
      <CardTitle className="text-sm leading-tight font-semibold text-black/90">
        {cardTitle}
      </CardTitle>
      {lastRun && (
        <span className="mt-auto text-[10px] text-black/35">{lastRun}</span>
      )}
    </Card>
  )
}

function PriorityPanel() {
  return (
    <div className="rounded-2xl border-5 p-4">
      <div className="mb-4 flex items-center gap-2">
        <span className="text-black-400 text-[20px] font-black tracking-widest uppercase">
          ↑ Priority
        </span>
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {priorityCards.map((card) => (
          <JobCard key={card.cardTitle} {...card} />
        ))}
      </div>
    </div>
  )
}

function LessPriorityPanel() {
  return (
    <div className="rounded-2xl border-3 bg-white/2 p-4 opacity-80">
      <div className="mb-4 flex items-center gap-2">
        <span className="text-[15px] font-bold tracking-widest text-black uppercase">
          Less Priority
        </span>
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {lessPriorityCards.map((card) => (
          <JobCard key={card.cardTitle} {...card} />
        ))}
      </div>
    </div>
  )
}

function OnDemandTable() {
  return (
    <Card className="fit h-full max-h-full rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm">
      <CardHeader className="px-4 pt-4 pb-2">
        <CardTitle className="flex items-center gap-2 text-sm font-semibold text-black/80">
          <span className="inline-block h-2 w-2 rounded-full bg-purple-400" />
          On-Demand
        </CardTitle>
      </CardHeader>
      <CardContent className="px-4 pb-4">
        <Table>
          <TableBody>
            {onDemandSideTable.map((item) => (
              <TableRow
                key={item.title}
                className="border-white/8 hover:bg-white/5"
              >
                <TableCell className="px-0 py-2">
                  <span className="block text-sm font-medium text-black">
                    {item.title}
                  </span>
                  <span className="text-[10px] text-black">{item.lastRun}</span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

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
