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
        `grid md:auto-cols-max md:grid-cols-fit-240 md:auto-rows-min gap-5`
      )}
      {...rest}
    >
      {items.map((item, index) => {
        const { mood } = item

        function getMoodColor() {
          switch (mood) {
            case "negative":
              return "text-red-400"
            case "positive":
              return "text-green-400"
            case "kudos":
              return "text-yellow-400"
          }
        }

        return (
          <li
            key={index}
            className="flex items-center overflow-hidden bg-gray-800 rounded-lg"
          >
            <span
              className={`bg-gray-700 self-stretch text-2xl ${getMoodColor()} items-center flex p-5`}
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

            <p className="p-5 text-lg">{item.content}</p>
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
  items: IListItem[]
}

export interface IListItem {
  mood: "positive" | "negative" | "alert" | "kudos"
  content: ReactNode | JSX.Element
}
