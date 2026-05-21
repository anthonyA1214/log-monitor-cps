export function getTimeStatus(dateModified: Date) {
  const diffMs = Date.now() - dateModified.getTime()
  const diffMins = diffMs / 1000 / 60

  if (diffMins <= 1) return "up-to-date"
  if (diffMins <= 3) return "delayed"
  return "stale"
}
