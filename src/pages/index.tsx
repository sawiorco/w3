import * as React from "react"
import { Link, graphql, useStaticQuery } from "gatsby"
import { GatsbyImage, getImage, StaticImage } from "gatsby-plugin-image"

import Layout from "../components/layout"
import Seo from "../components/seo"
import { MdxConnection, MdxFrontmatter, ImageSharp } from "../../graphql-types"

export default function IndexPage() {
  const data = useStaticQuery<IQueryIndexPage>(QUERY_INDEX_PAGE)

  const [isHovering, setIsHovering] = React.useState(false)

  return (
    <Layout>
      <Seo title="Home" />

      <div className="container mx-auto my-10">
        <h1>What to play</h1>

        <div className="grid grid-cols-6 gap-5 mt-5">
          {data.allMdx.edges.map(e => {
            return (
              <Link
                className="group"
                key={e.node.frontmatter.slug}
                to={`${e.node.frontmatter.slug}`}
              >
                <div className="overflow-hidden">
                  <GatsbyImage
                    className="object-cover object-top w-full h-full transition-all transform-gpu group-hover:scale-105"
                    alt="Hello"
                    image={getImage(
                      e.node.frontmatter.posterImage.childImageSharp
                        .gatsbyImageData
                    )}
                  />
                </div>

                <h3 className="transition-all group-hover:text-green-400">
                  {e.node.frontmatter.title}
                </h3>
              </Link>
            )
          })}
        </div>
      </div>
    </Layout>
  )
}

const QUERY_INDEX_PAGE = graphql`
  query Index {
    allMdx {
      totalCount
      edges {
        node {
          frontmatter {
            title
            slug
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

interface IQueryIndexPage {
  allMdx: Pick<MdxConnection, "totalCount"> & {
    edges: {
      node: {
        frontmatter: Pick<MdxFrontmatter, "title" | "slug"> & {
          posterImage: { childImageSharp: Pick<ImageSharp, "gatsbyImageData"> }
        }
      }
    }[]
  }
}
