import { Bookmark, Hourglass, Link2, Link2Off } from "lucide-react"
import AppStatCard from "./app-stat-card"

export default function AppStatCards() {
  return (
    <>
      <AppStatCard icon={Bookmark} title="Reads" count={100} />
      <AppStatCard icon={Link2} title="Matched" count={50} />
      <AppStatCard icon={Link2Off} title="Mismatched" count={25} />
      <AppStatCard icon={Hourglass} title="Pendings" count={75} />
    </>
  )
}
