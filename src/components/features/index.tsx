import React, { ReactNode } from "react"
import classNames from "classnames"

export function Features({ features, className, ...rest }: IProscons) {
  return (
    <div className={classNames(classNames, ``)} {...rest}>
      <div>
        <h2 className="text-2xl text-white">Features</h2>

        <ul>
          {features.map(f => {
            return (
              <li
                key={f.toString()}
                className="flex items-center ml-1 text-gray-300"
              >
                <span className="mr-2">&middot;</span>
                <p className="text-lg">{f.content}</p>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

interface IProscons extends React.HtmlHTMLAttributes<HTMLDivElement> {
  features: IFeature[]
}

interface IFeature {
  content: ReactNode
}
