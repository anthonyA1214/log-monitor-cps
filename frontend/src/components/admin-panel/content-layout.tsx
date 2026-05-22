import { Navbar } from "@/components/admin-panel/navbar"

interface ContentLayoutProps {
  children: React.ReactNode
}

export function ContentLayout({ children }: ContentLayoutProps) {
  return (
    <div className="flex h-screen w-full flex-col overflow-hidden">
      <Navbar />
      <div className="min-h-0 flex-1 px-4 pt-8 pb-8 sm:px-8">{children}</div>
    </div>
  )
}
