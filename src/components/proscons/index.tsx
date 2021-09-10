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

        <ul className="mt-2">
          {pros.map(pro => {
            return (
              <li
                key={pro.toString()}
                className="flex items-center mt-2 first:mt-0"
              >
                <p>{pro}</p>
              </li>
            )
          })}
        </ul>
      </div>

      <div className="p-5 border border-gray-400 border-solid rounded-lg md:mt-0">
        <h2 className="text-2xl text-gray-400">
          <FontAwesomeIcon className="mr-2" icon={faCircleExclamation} />
          Avoid it if...
        </h2>

        <ul className="mt-2">
          {cons.map(con => {
            return (
              <li
                key={con.toString()}
                className="flex items-center mt-2 first:mt-0"
              >
                <p>{con}</p>
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
