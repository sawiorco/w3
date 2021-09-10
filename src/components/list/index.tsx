import React, { ReactNode } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faThumbsUp,
  faThumbsDown,
  faStars,
  faCircleExclamation,
} from "@fortawesome/pro-thin-svg-icons"
import classNames from "classnames"

export function List({ className, items, ...rest }: IList) {
  return (
    <ul
      className={classNames(
        className,
        `grid md:grid-cols-2 lg:grid-cols-3 gap-5`
      )}
      {...rest}
    >
      {items.map((item, index) => {
        const { mood } = item

        return (
          <li key={index} className="items-center p-5 bg-gray-800 rounded-lg">
            <header className="flex items-center">
              <span
                className={`px-2 py-1 border border-solid border-${moodColors[mood]}-400 text-${moodColors[mood]}-400 rounded-full`}
              >
                {mood === "kudos" && <FontAwesomeIcon icon={faStars} />}
                {mood === "positive" && <FontAwesomeIcon icon={faThumbsUp} />}
                {mood === "negative" && (
                  <FontAwesomeIcon
                    className="relative top-0.5"
                    icon={faThumbsDown}
                  />
                )}
                {mood === "alert" && (
                  <FontAwesomeIcon icon={faCircleExclamation} />
                )}
              </span>

              <small
                className={`ml-2 font-semibold uppercase text-${moodColors[mood]}-400`}
              >
                {mood === "kudos" && <>Kudos</>}
                {mood === "positive" && <>Good</>}
                {mood === "negative" && <>Bad</>}
              </small>
            </header>

            <p className="mt-2">{item.content}</p>
          </li>
        )
      })}
    </ul>
  )
}

const moodColors = {
  kudos: "yellow",
  positive: "green",
  negative: "red",
  alert: "yellow",
}

interface IList
  extends Omit<React.HtmlHTMLAttributes<HTMLUListElement>, "title"> {
  items: IItem[]
}

interface IItem {
  mood: "positive" | "negative" | "alert" | "kudos"
  content: ReactNode
}
