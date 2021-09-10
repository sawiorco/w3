import * as React from "react"
import { Link, graphql, useStaticQuery } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"

import Layout from "../components/layout"
import Seo from "../components/seo"
import { MdxConnection, Mdx, MdxFrontmatter } from "../../graphql-types"

export default function IndexPage() {
  const data = useStaticQuery<IQueryIndexPage>(QUERY_INDEX_PAGE)

  return (
    <Layout>
      <Seo title="Home" />

      {/* <StaticImage
        src="../images/gatsby-astronaut.png"
        width={300}
        quality={95}
        formats={["auto", "webp", "avif"]}
        alt="A Gatsby astronaut"
        style={{ marginBottom: `1.45rem` }}
      /> */}

      {data.allMdx.edges.map(e => {
        return (
          <Link key={e.node.frontmatter.slug} to={`${e.node.frontmatter.slug}`}>
            {e.node.frontmatter.title}
          </Link>
        )
      })}
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
          }
        }
      }
    }
  }
`

interface IQueryIndexPage {
  allMdx: Pick<MdxConnection, "totalCount"> & {
    edges: { node: { frontmatter: Pick<MdxFrontmatter, "title" | "slug"> } }[]
  }
}
