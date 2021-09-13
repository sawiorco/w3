import { MdxFrontmatter, TagJson, ImageSharp } from "../../../graphql-types"

export type TReviewDetails = Pick<
  MdxFrontmatter,
  | "title"
  | "slug"
  | "createdAt"
  | "updatedAt"
  | "isPublished"
  | "youtubeTrailerId"
> & {
  tags: Pick<TagJson, "title">[]
  posterImage: { childImageSharp: Pick<ImageSharp, "gatsbyImageData"> }
  heroImage: { childImageSharp: Pick<ImageSharp, "gatsbyImageData"> }
}
