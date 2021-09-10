import React from "react"
import { IconProp } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faSignalBarsWeak,
  faSignalBarsFair,
  faSignalBarsGood,
  faSignalBarsStrong,
} from "@fortawesome/pro-duotone-svg-icons"
import classNames from "classnames"

import { Section, Checklist, IChecklistItem } from ".."

export function Replayability({
  className,
  value,
  checklist,
  ...rest
}: IReplayability) {
  return (
    <Section
      className="mt-10"
      title="Replayability"
      head={<Tracker value={value} />}
    >
      <Checklist className="mt-5" items={checklist} />
    </Section>
  )
}

function Tracker({ value }: { value: 1 | 2 | 3 | 4 }) {
  const icon = replayabilityValues[value][0]
  const copy = replayabilityValues[value][1]

  return (
    <div className="px-3 py-1 ml-5 bg-gray-800 rounded-lg">
      <FontAwesomeIcon icon={icon} />

      <span className="ml-2">{copy}</span>
    </div>
  )
}

const replayabilityValues: [IconProp, string][] = [
  [faSignalBarsWeak, "Low"],
  [faSignalBarsFair, "Medium"],
  [faSignalBarsGood, "High"],
  [faSignalBarsStrong, "Endless"],
]

interface IReplayability
  extends Omit<React.HtmlHTMLAttributes<HTMLUListElement>, "title" | "value"> {
  value: 1 | 2 | 3 | 4
  checklist: IChecklistItem[]
}
