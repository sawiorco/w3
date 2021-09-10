import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCheck, faTimes } from "@fortawesome/pro-thin-svg-icons"
import classNames from "classnames"

export function Checklist({ className, items, ...rest }: IChecklist) {
  return (
    <ul
      className={classNames(
        className,
        `grid lg:grid-cols-3 md:grid-cols-2 gap-5`
      )}
      {...rest}
    >
      {items.map((item, index) => {
        const { isChecked, title, body } = item

        const hasBody = Boolean(body)

        // body: "You have different choices at every new game, changing the entire play through",
        // body: "There's a good bunch of achievements to collect, and some of them are hard",

        return (
          <li
            key={index}
            className={`p-5 bg-gray-800 rounded-lg flex ${
              hasBody ? "items-start" : "items-center"
            }`}
          >
            <span
              className={`px-1 border border-solid border-${
                checkColors[isChecked.toString()]
              }-400 text-${checkColors[isChecked.toString()]}-400 rounded-full`}
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
  true: "green",
  false: "red",
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
