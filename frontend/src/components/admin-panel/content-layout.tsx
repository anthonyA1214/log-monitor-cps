import { Navbar } from "@/components/admin-panel/navbar"

interface ContentLayoutProps {
  title: string
  children: React.ReactNode
}

export function ContentLayout({ title, children }: ContentLayoutProps) {
  return (
    <div className="flex h-screen w-full flex-col overflow-hidden">
      <Navbar title={title} />
      <div className="px-4 pt-8 pb-8 sm:px-8">{children}</div>
    </div>
  )
}
