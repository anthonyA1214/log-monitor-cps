import type { PriorityCard } from "@/lib/types/priority-card"
import { Card, CardTitle } from "../ui/card"

export default function JobCard({
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
