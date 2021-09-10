import React, { ReactNode } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faThumbsUp,
  faCircleExclamation,
} from "@fortawesome/pro-thin-svg-icons"
import classNames from "classnames"

export function Section({ className, title, children, ...rest }: ISection) {
  return (
    <section className={classNames(className)} {...rest}>
      <header className="relative flex items-center">
        <div className="absolute flex-grow w-1 h-full bg-green-400 rounded-full" />
        <h2 className="ml-2 font-thin">{title}</h2>
      </header>

      {children}
    </section>
  )
}

interface ISection
  extends Omit<React.HtmlHTMLAttributes<HTMLDivElement>, "title"> {
  title: string
  children: React.ReactNode
}
