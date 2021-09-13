import { TagJson } from "../../../graphql-types"

export function groupTags(flatTags: TTag[]): IGroupedTags {
  return flatTags.reduce(
    (prev: IGroupedTags, curr: TTag): IGroupedTags => {
      return groupify(curr, prev)
    },
    { genres: [], moods: [], themes: [] }
  )
}

export interface IGroupedTags {
  moods: TTag[]
  genres: TTag[]
  themes: TTag[]
}

function groupify(tag: TTag, previous: IGroupedTags): IGroupedTags {
  if (!tag.markers || tag.markers.length === 0) {
    return previous
  }

  if (tag.markers.includes("genre")) {
    return {
      ...previous,

      genres: [...previous.genres, tag],
    }
  }

  if (tag.markers.includes("mood")) {
    return {
      ...previous,

      moods: [...previous.moods, tag],
    }
  }

  if (tag.markers.includes("theme")) {
    return {
      ...previous,

      themes: [...previous.themes, tag],
    }
  }

  return previous
}

type TTag = Pick<TagJson, "slug" | "title" | "markers">
