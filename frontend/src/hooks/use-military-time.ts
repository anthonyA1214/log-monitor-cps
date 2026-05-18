import { useState, useEffect } from "react"
import { format } from "date-fns"

export function useMilitaryTime() {
  const [time, setTime] = useState(() => format(new Date(), "HH:mm:ss"))

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(format(new Date(), "HH:mm:ss"))
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  return time
}
