import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCheck, faTimes } from "@fortawesome/pro-thin-svg-icons"
import classNames from "classnames"

export function Checklist({ className, items, ...rest }: IChecklist) {
  return (
    <ul
      className={classNames(
        className,
        `grid md:auto-cols-max md:grid-cols-fit-240 md:auto-rows-min gap-5`
      )}
      {...rest}
    >
      {items.map((item, index) => {
        const { isChecked, title, body } = item

        const hasBody = Boolean(body)

        return (
          <li
            key={index}
            className={`p-5 bg-gray-800 rounded-lg flex ${
              hasBody ? "items-start" : "items-center"
            }`}
          >
            <span
              className={`px-1 border border-solid ${
                checkColors[isChecked.toString()]
              } rounded-full`}
            >
              {isChecked && (
                <FontAwesomeIcon className="relative top-0.5" icon={faCheck} />
              )}

              {!isChecked && (
                <FontAwesomeIcon className="relative top-0.5" icon={faTimes} />
              )}
            </span>

            <div className="ml-2">
              <h4>{title}</h4>

              {hasBody && <p>{body}</p>}
            </div>
          </li>
        )
      })}
    </ul>
  )
}

const checkColors = {
  true: "border-green-400 text-green-400",
  false: "border-red-400 text-red-400",
}

interface IChecklist
  extends Omit<React.HtmlHTMLAttributes<HTMLUListElement>, "title"> {
  items: IChecklistItem[]
}

export interface IChecklistItem {
  isChecked: boolean
  title: React.ReactNode
  body: React.ReactNode
}
