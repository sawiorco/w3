import React, { ReactNode } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faThumbsUp,
  faCircleExclamation,
} from "@fortawesome/pro-thin-svg-icons"
import classNames from "classnames"

export function Proscons({ pros, cons, className, ...rest }: IProscons) {
  return (
    <div
      className={classNames(classNames, `grid md:grid-cols-2 gap-5`)}
      {...rest}
    >
      <div className="p-5 border border-green-400 border-solid rounded-lg">
        <h2 className="text-2xl text-green-400">
          <FontAwesomeIcon className="mr-2" icon={faThumbsUp} />
          Play it if...
        </h2>

        <ul className="flex flex-col gap-5 mt-2">
          {pros.map(pro => {
            return (
              <li
                key={pro.toString()}
                className="flex items-center gap-5 text-lg leading-tight"
              >
                {pro}
              </li>
            )
          })}
        </ul>
      </div>

      <div className="p-5 border border-gray-800 border-solid rounded-lg md:mt-0">
        <h2 className="text-2xl text-white">
          <FontAwesomeIcon className="mr-2" icon={faCircleExclamation} />
          Avoid it if...
        </h2>

        <ul className="flex flex-col gap-5 mt-2">
          {cons.map(con => {
            return (
              <li
                key={con.toString()}
                className="flex items-center text-lg leading-tight"
              >
                {con}
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

interface IProscons extends React.HtmlHTMLAttributes<HTMLDivElement> {
  pros: ReactNode[]
  cons: ReactNode[]
}
