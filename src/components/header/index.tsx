import * as React from "react"
import { Link } from "gatsby"

import { useLocation } from "@reach/router"

export function Header({ siteTitle = "" }: IHeader) {
  const { pathname } = useLocation()

  const isReviewPage = pathname.includes("review")

  return (
    <header
      className={`${
        isReviewPage && "absolute z-10 bg-opacity-50 hover:bg-opacity-90"
      } w-full py-2 text-gray-200 transition-all bg-gray-800`}
    >
      <div className="container mx-auto">
        <Link to="/">{siteTitle}</Link>
      </div>
    </header>
  )
}

interface IHeader {
  siteTitle: string
}
