import * as React from "react"
import { Link, graphql, useStaticQuery } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { useQueryParam, NumberParam, StringParam } from "use-query-params"

import Layout from "../components/layout"
import Seo from "../components/seo"
import {
  MdxConnection,
  MdxFrontmatter,
  ImageSharp,
  TagJson,
} from "../../graphql-types"
import { IndexSidebar } from "../components/indexSidebar"
import { groupTags, IGroupedTags } from "../features/tag/createTagGroups"
import { Poster } from "../components"
import { TRecord } from "../features/record/types"

export default function IndexPage() {
  const { allMdx, allTagJson } =
    useStaticQuery<IQueryIndexPageData>(QUERY_INDEX_PAGE)

  const allRecords = allMdx.edges.map(e => e.node.frontmatter)
  const [records, setRecords] = React.useState<TRecord[]>(allRecords)

  function filterRecords(filterTags: string[]) {
    const filteredReviews = allRecords.reduce((prev, curr): TRecord[] => {
      const reviewTags = curr.tags

      if (filterTags.every(ft => reviewTags.find(x => x.slug === ft))) {
        return [...prev, curr]
      }

      return prev
    }, [])

    setRecords(
      filteredReviews.sort((a, b) => {
        if (a.title < b.title) {
          return -1
        }

        if (a.title > b.title) {
          return 1
        }

        return 0
      })
    )
  }

  const tagGroups: IGroupedTags = groupTags(allTagJson.edges.map(e => e.node))

  return (
    <Layout>
      <Seo title="Home" />

      <div className="container mx-auto my-10">
        <div className="gap-5 md:grid md:grid-cols-6">
          <div className="mb-5 md:mb-0">
            <IndexSidebar
              availableFilters={{ ...tagGroups }}
              onActiveFiltersChange={filterRecords}
            />
          </div>

          {records.length === 0 && (
            <div className="md:col-span-4">
              <p>There are no results for the filters you were looking for.</p>
            </div>
          )}

          {records.length > 0 && (
            <div className="grid grid-cols-2 gap-5 md:col-span-4 md:grid-cols-4 lg:grid-cols-6">
              {records.map(record => {
                return <Poster record={record} />
              })}
            </div>
          )}
        </div>
      </div>
    </Layout>
  )
}

const QUERY_INDEX_PAGE = graphql`
  query IndexPage {
    allMdx {
      totalCount
      edges {
        node {
          frontmatter {
            title
            slug
            tags {
              slug
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

    allTagJson {
      edges {
        node {
          slug
          title
          markers
        }
      }
    }
  }
`

interface IQueryIndexPageData {
  allMdx: Pick<MdxConnection, "totalCount"> & {
    edges: {
      node: {
        frontmatter: TRecord
      }
    }[]
  }

  allTagJson: {
    edges: {
      node: TTag
    }[]
  }
}

type TTag = Pick<TagJson, "slug" | "title" | "markers">
