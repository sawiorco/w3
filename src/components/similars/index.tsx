import { graphql, useStaticQuery } from "gatsby"
import * as React from "react"
import { intersectionBy, shuffle } from "lodash"

import { Poster, Section } from ".."
import { TRecord } from "../../features/record/types"
import { TagJson } from "../../../graphql-types"

function getSharedTags(
  tags1: Pick<TagJson, "slug" | "markers">[],
  tags2: Pick<TagJson, "slug" | "markers">[]
) {
  const relevantTags1 = tags1.filter(t => !t.markers.includes("feature"))
  const relevantTags2 = tags2.filter(t => !t.markers.includes("feature"))

  return intersectionBy(relevantTags1, relevantTags2, "slug")
}

export function Similars({ sourceRecord }: ISimilars) {
  const { allMdx } = useStaticQuery<IQuerySimilarsData>(QUERY_SIMILARS)

  const allRecords = allMdx.edges
    .map(e => e.node)
    .filter(r => r.frontmatter.slug !== sourceRecord.slug)

  const similarRecords = allRecords
    .map(ar => ar.frontmatter)
    .reduce(
      (prev: TSimilarRecord[], curr: TSimilarRecord): TSimilarRecord[] => {
        const sharedTags = getSharedTags(curr.tags, sourceRecord.tags)

        if (sharedTags.length > 3) {
          return [...prev, curr]
        }

        return prev
      },
      []
    )

  if (similarRecords.length === 0) {
    return null
  }

  return (
    <Section title="Similar titles" className="mt-10">
      <div className="grid grid-cols-2 gap-5 mt-5 md:grid-cols-6">
        {shuffle(similarRecords)
          .slice(0, 5)
          .map(sr => {
            return <Poster key={sr.slug} record={sr} />
          })}
      </div>
    </Section>
  )
}

interface ISimilars {
  sourceRecord: TRecord
}

const QUERY_SIMILARS = graphql`
  query Similars {
    allMdx {
      edges {
        node {
          frontmatter {
            slug
            title
            tags {
              slug
              title
              markers
            }
            posterImage {
              childImageSharp {
                gatsbyImageData
              }
            }
          }
        }
      }
    }
  }
`

interface IQuerySimilarsData {
  allMdx: {
    edges: {
      node: {
        frontmatter: TSimilarRecord
      }
    }[]
  }
}

type TSimilarRecord = Pick<TRecord, "slug" | "title" | "tags" | "posterImage">
