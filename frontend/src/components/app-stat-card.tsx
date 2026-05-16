import type { LucideIcon } from "lucide-react"

interface Props {
  icon: LucideIcon
  title: string
  count: number
}

export default function AppStatCard({ icon: Icon, title, count }: Props) {
  return (
    <div className="flex h-fit flex-col gap-y-8 rounded-lg bg-white p-4 shadow-md">
      <div className="flex items-center gap-2">
        <Icon className="h-8 w-8 text-navy-blue" />
        <h2 className="text-lg font-medium">{title}</h2>
      </div>

      <span className="text-2xl font-bold">{count}</span>
    </div>
  )
}
