export function getTimeStatus(dateModified: Date) {
  const diffMs = Date.now() - dateModified.getTime()
  const diffMins = diffMs / 1000 / 60

  if (diffMins <= 1) return "green"
  if (diffMins <= 3) return "yellow"
  return "red"
}
