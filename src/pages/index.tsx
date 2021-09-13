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
import { groupTags, IGroupedTags } from "../features/tags/createTagGroups"

export default function IndexPage() {
  const { allMdx, allTagJson } =
    useStaticQuery<IQueryIndexPageData>(QUERY_INDEX_PAGE)

  const allReviews = allMdx.edges.map(e => e.node)
  const [reviews, setReviews] = React.useState(allReviews)

  function filterReviews(filterTags: string[]) {
    const filteredReviews = allReviews.reduce((prev, curr): TReview[] => {
      const reviewTags = curr.frontmatter.tags

      if (filterTags.every(ft => reviewTags.find(x => x.slug === ft))) {
        return [...prev, curr]
      }

      return prev
    }, [])

    setReviews(
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
              onActiveFiltersChange={filterReviews}
            />
          </div>

          {reviews.length === 0 && (
            <div className="md:col-span-4">
              <p>There are no results for the filters you were looking for.</p>
            </div>
          )}

          {reviews.length > 0 && (
            <div className="grid grid-cols-2 gap-5 md:col-span-4 md:grid-cols-4 lg:grid-cols-6">
              {reviews.map(post => {
                return (
                  <Link
                    className="group"
                    key={post.frontmatter.slug}
                    to={`${post.frontmatter.slug}`}
                  >
                    <div className="overflow-hidden">
                      <GatsbyImage
                        className="object-cover object-top w-full h-full transition-all transform-gpu group-hover:scale-105"
                        alt="Hello"
                        image={getImage(
                          post.frontmatter.posterImage.childImageSharp
                            .gatsbyImageData
                        )}
                      />
                    </div>

                    <h3 className="mt-2 transition-all group-hover:text-green-400">
                      {post.frontmatter.title}
                    </h3>
                  </Link>
                )
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
      node: TReview
    }[]
  }

  allTagJson: {
    edges: {
      node: TTag
    }[]
  }
}

type TReview = {
  frontmatter: Pick<MdxFrontmatter, "title" | "slug" | "tags"> & {
    posterImage: { childImageSharp: Pick<ImageSharp, "gatsbyImageData"> }
  }
}

type TTag = Pick<TagJson, "slug" | "title" | "markers">

type TTagGroups = { mood: TTag[]; genre: TTag[] }
