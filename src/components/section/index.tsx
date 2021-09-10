import React from "react"
import classNames from "classnames"

export function Section({
  className,
  title,
  head,
  children,
  ...rest
}: ISection) {
  return (
    <section className={classNames(className)} {...rest}>
      <header className="relative flex items-center">
        <div className="absolute flex-grow w-1 h-full bg-green-400 rounded-full" />

        <div className="flex items-center ml-2">
          <h2 className="font-thin">{title}</h2>

          {head}
        </div>
      </header>

      {children}
    </section>
  )
}

interface ISection
  extends Omit<React.HtmlHTMLAttributes<HTMLDivElement>, "title"> {
  title: React.ReactNode
  children: React.ReactNode
  head?: React.ReactNode
}
