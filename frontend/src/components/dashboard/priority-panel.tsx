import type { PriorityCard } from "@/lib/types/priority-card"
import JobCard from "./job-card"

const dateNow = new Date()
const priorityCards: PriorityCard[] = [
  {
    cardTitle: "Automatic Aired",
    fetching: "Daily",
    fetchingBGColor: "#FFFFFF",
    color: "#22c55e",
    lastRun: dateNow,
    fileSize: "File Size: " + "22",
  },
  {
    cardTitle: "Win Media Schedule",
    fetching: "Daily",
    fetchingBGColor: "#FFFFFF",
    color: "#22c55e",
    lastRun: dateNow,
    fileSize: "File Size: " + "22",
  },
  {
    cardTitle: "SV Sync",
    fetching: "Daily",
    fetchingBGColor: "#FFFFFF",
    color: "#22c55e",
    lastRun: dateNow,
    fileSize: "File Size: " + "22",
  },
  {
    cardTitle: "OR Sync",
    fetching: "Recursive",
    fetchingBGColor: "#FFFFFF",
    color: "#f97316",
    lastRun: dateNow,
    fileSize: "File Size: " + "22",
  },
]

export default function PriorityPanel() {
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
