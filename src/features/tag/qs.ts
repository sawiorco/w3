import { useQueryParam, StringParam } from "use-query-params"
import { navigate } from "gatsby-link"

export function useTagsQs() {
  const [tagsQs, setTagsQs] = useQueryParam("tags", StringParam)

  const tagsArray = tagsQs ? tagsQs.split(",") : []

  function overrideTags(tags: string[]) {
    if (tags.length === 0) {
      setTagsQs(undefined)
      return
    }

    setTagsQs(tags.join(","))
  }

  function applyTags(tags: string[]) {
    navigate(`/?tags=${tags.join(",")}`)
  }

  function clearTags() {
    setTagsQs(undefined)
  }

  return {
    tagsQs,
    tagsArray,
    overrideTags,
    applyTags,
    clearTags,
  }
}
