import React from "react"

import { TRecord } from "../../features/record/types"
import { Section, TagIcon } from ".."
import { Meter } from "../meter"
import classNames from "classnames"

export function Features({
  className,
  record,
  replayValue = 1,
  ...rest
}: IProscons) {
  const featureTags = record.tags.filter(t => t.markers.includes("feature"))

  return (
    <Section className={classNames(className, "mt-10")} title="Features">
      <div className="flex items-center mt-5">
        <h3 className="mr-5">Replayability</h3>
        <Meter value={replayValue} />
      </div>

      <ul
        className={`mt-5 grid md:auto-cols-max md:grid-cols-fit-240 md:auto-rows-min gap-5`}
      >
        {featureTags.map(ft => {
          return (
            <li
              className={`flex flex-col p-5 bg-gray-800 rounded-lg`}
              key={ft.slug}
            >
              <div className="flex items-start flex-1">
                <TagIcon fixedWidth={true} className="text-2xl " tag={ft} />

                <div className="ml-2">
                  <h4>{ft.title}</h4>
                  <p>{ft.description}</p>
                </div>
              </div>

              <footer className="flex mt-5">
                {ft.markers.includes("replay-factor") && (
                  <div className="px-2 text-xs font-bold text-gray-900 uppercase bg-gray-500 rounded-lg">
                    Replay factor
                  </div>
                )}
              </footer>
            </li>
          )
        })}
      </ul>
    </Section>
  )
}

interface IProscons extends React.HtmlHTMLAttributes<HTMLDivElement> {
  record: TRecord
  replayValue: 0 | 1 | 2 | 3
}
