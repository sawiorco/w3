import { MdxFrontmatter, TagJson, ImageSharp } from "../../../graphql-types"

export type TRecord = Pick<
  MdxFrontmatter,
  | "title"
  | "slug"
  | "isPublished"
  | "youtubeTrailerId"
  | "steamAppId"
  | "createdAt"
  | "updatedAt"
> & {
  tags: Pick<TagJson, "slug" | "title" | "description" | "markers">[]
  posterImage: { childImageSharp: Pick<ImageSharp, "gatsbyImageData"> }
  heroImage: { childImageSharp: Pick<ImageSharp, "gatsbyImageData"> }
}
