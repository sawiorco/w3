import React from "react"
import { graphql } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import ReactPlayer from "react-player/lazy"

import Seo from "../components/seo"
import Layout from "../components/layout"
import { MdxFrontmatter, Mdx, ImageSharp } from "../../graphql-types"
import { Parallax, Background } from "react-parallax"

export default function ReviewTemplate({
  data, // this prop will be injected by the GraphQL query below.
}: IReviewTemplate) {
  const { mdx } = data
  const { frontmatter, body } = mdx

  return (
    <>
      <Seo title={frontmatter.title} />

      <Layout>
        <header className="relative">
          <div className="w-full bg-gray-900 transform-gpu translate-1/2 h-96">
            <Parallax strength={500} className="w-full h-full">
              <Background className="w-full h-full">
                <GatsbyImage
                  className="object-cover object-top w-full h-full opacity-50"
                  alt="Hello"
                  image={getImage(
                    frontmatter.heroImage.childImageSharp.gatsbyImageData
                  )}
                />
              </Background>
            </Parallax>

            <div className="absolute bottom-0 w-full h-2/3 md:bg-gradient-to-b from-transparent via-transparent md:to-gray-800"></div>
          </div>

          {/* <div className="w-screen h-96 md:h-128">
            <div className="video-hero">
              <ReactPlayer
                width="100%"
                height="100%"
                url={`https://www.youtube.com/watch?v=${frontmatter.youtubeTrailerId}`}
                config={{
                  youtube: {
                    playerVars: {
                      playlist: frontmatter.youtubeTrailerId,
                      loop: 1,
                      autoplay: 1,
                      rel: 0,
                      mute: 1,
                      modestbranding: 1,
                      showinfo: 0,
                      color: "white",
                      controls: 0,
                    },
                  },
                  vimeo: {
                    playerOptions: {
                      autoplay: 1,
                      muted: 1,
                      color: "ffffff",
                      byline: 1,
                      portrait: 0,
                      controls: true,
                    },
                  },
                }}
              />
            </div>
          </div> */}

          <div className="container mx-auto">
            <div className="-mt-48 md:flex">
              <GatsbyImage
                alt="Hello"
                image={getImage(
                  frontmatter.posterImage.childImageSharp.gatsbyImageData
                )}
              />

              <div className="relative grid gap-10 mt-10 md:mt-0 md:p-10 md:items-start">
                <div className="text-white">
                  <p className="text-xl text-green-400">Should I play</p>

                  <div className="relative flex items-center">
                    <div className="absolute flex-grow w-1 h-full bg-green-400 rounded-full" />
                    <h1 className="ml-2 text-5xl font-thin lg:text-6xl">
                      {frontmatter.title}?
                    </h1>
                  </div>
                </div>

                <div className="relative">
                  <small className="text-gray-400">
                    Last update at {frontmatter.updatedAt}
                  </small>
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="container mx-auto mt-10">
          <div className="mt-10 mb-10">
            <MDXRenderer>{body}</MDXRenderer>
          </div>
        </div>
      </Layout>
    </>
  )
}

export const pageQuery = graphql`
  query ReviewTemplate($id: String!) {
    mdx(id: { eq: $id }) {
      body
      frontmatter {
        slug
        title
        createdAt(formatString: "MMMM DD, YYYY")
        updatedAt(formatString: "MMMM DD, YYYY")
        isPublished
        youtubeTrailerId
        posterImage {
          childImageSharp {
            gatsbyImageData
          }
        }
        heroImage {
          childImageSharp {
            gatsbyImageData
          }
        }
      }
    }
  }
`

interface IReviewTemplate {
  data: {
    mdx: {
      body: keyof Pick<Mdx, "body">
      frontmatter: Pick<
        MdxFrontmatter,
        | "title"
        | "slug"
        | "createdAt"
        | "updatedAt"
        | "isPublished"
        | "youtubeTrailerId"
      > & {
        posterImage: { childImageSharp: Pick<ImageSharp, "gatsbyImageData"> }
        heroImage: { childImageSharp: Pick<ImageSharp, "gatsbyImageData"> }
      }
    }
  }
}
