import * as React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { IconProp } from "@fortawesome/fontawesome-svg-core"
import {
  faSignalBarsWeak,
  faSignalBarsFair,
  faSignalBarsGood,
  faSignalBarsStrong,
} from "@fortawesome/pro-duotone-svg-icons"

export function Meter({ value }: { value: 0 | 1 | 2 | 3 }) {
  const icon = intensity[value][0]
  const copy = intensity[value][1]

  return (
    <div className="px-3 py-1 bg-gray-800 rounded-lg">
      <FontAwesomeIcon icon={icon} />

      <span className="ml-2">{copy}</span>
    </div>
  )
}

const intensity: [IconProp, string][] = [
  [faSignalBarsWeak, "Low"],
  [faSignalBarsFair, "Medium"],
  [faSignalBarsGood, "High"],
  [faSignalBarsStrong, "Endless"],
]
