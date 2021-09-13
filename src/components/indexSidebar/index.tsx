import * as React from "react"
import pluralize from "pluralize"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { uniq } from "lodash"
import {
  faCheck,
  faSword,
  faMasksTheater,
  faArrowDown,
} from "@fortawesome/pro-thin-svg-icons"

import { TagJson } from "../../../graphql-types"

export function IndexSidebar({
  availableFilters,
  onActiveFiltersChange,
}: IIndexSidebar) {
  const [isVisible, setIsVisible] = React.useState(false)
  const [activeFilters, setActiveFilters] = React.useState<string[]>([])

  React.useEffect(() => {
    onActiveFiltersChange(activeFilters)
  }, [activeFilters])

  function activateFilter(filter: string) {
    setActiveFilters(prev => uniq([...prev, filter]))
  }

  function deactivateFilter(filter: string) {
    setActiveFilters(prev => prev.filter(f => f !== filter))
  }

  function toggleFilter(tagSlug: string) {
    if (activeFilters.includes(tagSlug)) {
      deactivateFilter(tagSlug)

      return
    }

    activateFilter(tagSlug)
  }

  function clearFilters() {
    setActiveFilters([])
  }

  function toggleVisibility() {
    setIsVisible(prev => !prev)
  }

  return (
    <aside className="relative">
      <div
        className="flex items-center justify-between p-5 mb-2 border border-gray-800 rounded-lg md:hidden"
        onClick={toggleVisibility}
      >
        <p>
          Filters {activeFilters.length > 0 && <>({activeFilters.length})</>}
        </p>

        <FontAwesomeIcon
          icon={faArrowDown}
          className={`transition-all duration-500 transform ${
            isVisible ? "rotate-180" : ""
          }`}
        />
      </div>

      <div
        className={`p-5 border border-gray-800 rounded-lg duration-500 z-10 bg-gray-900 transition-all ${
          isVisible
            ? "relative visible opacity-100"
            : "w-full absolute invisible opacity-0"
        } md:visible md:opacity-100`}
      >
        {activeFilters.length > 0 && (
          <button
            className="w-full py-1 mb-5 text-base font-semibold tracking-tighter text-white transition-all bg-gray-600 rounded-md hover:bg-blue-600"
            onClick={clearFilters}
          >
            Clear {activeFilters.length}{" "}
            {pluralize("filter", activeFilters.length)}
          </button>
        )}

        <section>
          <h5 className="text-base text-gray-300 uppercase">
            <FontAwesomeIcon icon={faMasksTheater} /> Mood
          </h5>

          <ul className="flex flex-col gap-1 mt-2">
            {availableFilters.mood.map(t => {
              return (
                <Filter
                  key={t.slug}
                  tag={t}
                  isActive={activeFilters.includes(t.slug)}
                  onClick={() => toggleFilter(t.slug)}
                />
              )
            })}
          </ul>
        </section>

        <section className="mt-5">
          <h5 className="text-base text-gray-300 uppercase">
            <FontAwesomeIcon icon={faSword} /> Genre
          </h5>

          <ul className="flex flex-col gap-1 mt-2">
            {availableFilters.genre.map(t => {
              return (
                <Filter
                  key={t.slug}
                  tag={t}
                  isActive={activeFilters.includes(t.slug)}
                  onClick={() => toggleFilter(t.slug)}
                />
              )
            })}
          </ul>
        </section>
      </div>
    </aside>
  )
}

interface IIndexSidebar {
  availableFilters: { mood: TTag[]; genre: TTag[] }
  onActiveFiltersChange: (newActiveFilters: string[]) => void
}

function Filter({ tag, isActive, onClick }: IFilter) {
  return (
    <li
      onClick={onClick}
      className={`p-1 px-2 text-base ${
        isActive ? "bg-gray-800" : "bg-gray-800"
      } ${
        isActive ? "text-green-400" : "text-gray-300"
      } rounded-lg cursor-pointer transform-gpu hover:scale-105 transition-all`}
    >
      {isActive && <FontAwesomeIcon className="mr-1" icon={faCheck} />}
      {tag.title}
    </li>
  )
}

interface IFilter {
  tag: TTag
  isActive: boolean
  onClick: () => void
}

type TTag = Pick<TagJson, "slug" | "title" | "markers">
