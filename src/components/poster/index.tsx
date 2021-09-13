import * as React from "react"
import { Link } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

import { TRecord } from "../../features/record/types"

export function Poster({ record }: IPoster) {
  return (
    <Link className="group" key={record.slug} to={`${record.slug}`}>
      <div className="overflow-hidden">
        <GatsbyImage
          className="object-cover object-top w-full h-full transition-all transform-gpu group-hover:scale-105"
          alt={`Poster of ${record.title}`}
          image={getImage(record.posterImage.childImageSharp.gatsbyImageData)}
        />
      </div>

      <p className="mt-2 text-base transition-all group-hover:text-green-400 md:text-lg">
        {record.title}
      </p>
    </Link>
  )
}

interface IPoster {
  record: Pick<TRecord, "slug" | "title" | "posterImage">
}
