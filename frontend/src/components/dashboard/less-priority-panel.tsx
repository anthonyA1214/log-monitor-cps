import type { PriorityCard } from "@/lib/types/priority-card"
import JobCard from "./job-card"

const dateNow = new Date()
const lessPriorityCards: PriorityCard[] = [
  {
    cardTitle: "WM Sync",
    fetching: "Daily",
    fetchingBGColor: "#FFFFFF",
    color: "#60a5fa",
    lastRun: dateNow,
    fileSize: "File Size: " + "22",
  },
  {
    cardTitle: "WM Compare",
    fetching: "Daily",
    fetchingBGColor: "#FFFFFF",
    color: "#60a5fa",
    lastRun: dateNow,
    fileSize: "File Size: " + "22",
  },
  {
    cardTitle: "IM Header",
    fetching: "Recursive",
    fetchingBGColor: "#FFFFFF",
    color: "#f97316",
    lastRun: dateNow,
    fileSize: "File Size: " + "22",
  },
  {
    cardTitle: "IM Detail",
    fetching: "Recursive",
    fetchingBGColor: "#FFFFFF",
    color: "#22c55e",
    lastRun: dateNow,
    fileSize: "File Size: " + "22",
  },
]

export default function LessPriorityPanel() {
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
