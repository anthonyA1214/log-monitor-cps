import { ContentLayout } from "@/components/admin-panel/content-layout"
import { logsQueries } from "@/lib/api/logs"
import { createFileRoute } from "@tanstack/react-router"
import { Button } from "@/components/ui/button"

export const Route = createFileRoute("/logs/_logs/$fileName")({
  loader: ({ context: { queryClient }, params: { fileName } }) => {
    return queryClient.ensureQueryData(logsQueries.info(fileName))
  },
  component: LogsInfoPage,
})

function LogsInfoPage() {
  const fileName = Route.useParams().fileName

  return (
    <ContentLayout title={fileName}>
      <Button className="mb-5">Back</Button>
      <div className="relative rounded-2xl h-120 w-full bg-gray-300">
        <div className="relative rounded-tl-2xl rounded-tr-2xl bg-gray-700 w-full h-15 flex ">
          <p  className="relative w-[15%] ml-12 pt-5">
            <span className="absolute m-auto text-white">{fileName}</span>
          </p>
          <div className="  pt-5 relative w-[85%] bg-gray-7 00 rounded-tr-2xl h-15 flex flex-row justify-end space-x-5 space-y-4">
            <p className="mr-4 text-white">
              Date Modified: {}Time
            </p>
            <p className="mr-4 text-white">
              Status: {}status - {}duration
            </p>
            
          </div>
            


        </div>
      </div>
    </ContentLayout>
  )
}
