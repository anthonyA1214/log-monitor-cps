import { Skeleton } from "../ui/skeleton"

export default function EditLogFormSkeleton() {
  return (
    <div className="space-y-6">
      {/* Title field */}
      <div className="space-y-2">
        <Skeleton className="h-4 w-10" /> {/* Label */}
        <Skeleton className="h-9 w-full" /> {/* Input */}
        <Skeleton className="h-3 w-64" /> {/* Description */}
      </div>

      {/* File Path field */}
      <div className="space-y-2">
        <Skeleton className="h-4 w-16" /> {/* Label */}
        <Skeleton className="h-9 w-full" /> {/* Input */}
        <Skeleton className="h-3 w-72" /> {/* Description */}
      </div>

      {/* File Name field */}
      <div className="space-y-2">
        <Skeleton className="h-4 w-16" /> {/* Label */}
        <Skeleton className="h-9 w-full opacity-50" /> {/* Input (disabled) */}
        <Skeleton className="h-3 w-60" /> {/* Description */}
      </div>

      {/* Footer buttons */}
      <div className="flex justify-end gap-2">
        <Skeleton className="h-9 w-20" /> {/* Cancel button */}
        <Skeleton className="h-9 w-28" /> {/* Save Changes button */}
      </div>
    </div>
  )
}
