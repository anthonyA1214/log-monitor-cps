import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface Props {
  fileName: string
  content: string
}

export default function AppDialog({ fileName, content }: Props) {
  return (
    <Dialog>
      <DialogTrigger className="text-blue-500 hover:text-blue-700 hover:underline">{fileName}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{fileName}</DialogTitle>
        </DialogHeader>
        <p>{content}</p>
      </DialogContent>
    </Dialog>
  )
}
