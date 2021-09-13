import * as React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faSword,
  faFerrisWheel,
  faMasksTheater,
} from "@fortawesome/pro-thin-svg-icons"

import { TagJson } from "../../../graphql-types"
import { TReviewDetails } from "../../features/review/types"
import { groupTags } from "../../features/tags/createTagGroups"
import { useTagsQs } from "../../features/tags/qs"

export function ReviewSidebar({ details }: IReviewSidebar) {
  const { applyTags } = useTagsQs()

  const tagGroups = groupTags(details.tags)

  return (
    <aside className="relative">
      <div
        className={`p-5 border border-gray-800 rounded-lg duration-500 z-10 bg-gray-900 transition-all md:visible md:opacity-100`}
      >
        <section>
          <h5 className="text-base text-gray-300 uppercase">
            <FontAwesomeIcon icon={faMasksTheater} /> Moods
          </h5>

          <ul className="flex flex-col gap-1 mt-2">
            {tagGroups.moods.map(t => {
              return (
                <GameTag
                  key={t.slug}
                  tag={t}
                  onClick={() => {
                    applyTags([t.slug])
                  }}
                />
              )
            })}
          </ul>
        </section>

        <section className="mt-5">
          <h5 className="text-base text-gray-300 uppercase">
            <FontAwesomeIcon icon={faSword} /> Genres
          </h5>

          <ul className="flex flex-col gap-1 mt-2">
            {tagGroups.genres.map(t => {
              return (
                <GameTag
                  key={t.slug}
                  tag={t}
                  onClick={() => {
                    applyTags([t.slug])
                  }}
                />
              )
            })}
          </ul>
        </section>

        <section className="mt-5">
          <h5 className="text-base text-gray-300 uppercase">
            <FontAwesomeIcon icon={faFerrisWheel} /> Themes
          </h5>

          <ul className="flex flex-col gap-1 mt-2">
            {tagGroups.themes.map(t => {
              return (
                <li
                  key={t.slug}
                  className={`p-1 px-2 text-base border border-solid border-gray-800  text-gray-300 rounded-lg`}
                >
                  {t.title}
                </li>
              )
            })}
          </ul>
        </section>
      </div>
    </aside>
  )
}

interface IReviewSidebar {
  details: TReviewDetails
}

function GameTag({ tag, onClick }: IFilter) {
  return (
    <li
      onClick={onClick}
      className={`p-1 px-2 text-base bg-gray-800 text-gray-300 rounded-lg transform-gpu hover:scale-105 transition-all cursor-pointer`}
    >
      {tag.title}
    </li>
  )
}

interface IFilter {
  tag: TTag
  onClick: () => void
}

type TTag = Pick<TagJson, "slug" | "title" | "markers">
