import * as React from "react"
import { navigate } from "gatsby"

export default function Review() {
  React.useEffect(() => {
    navigate("/")
  }, [])

  return null
}
