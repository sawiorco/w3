import * as React from "react"

import { IListItem, List, Section } from ".."
import { TRecord } from "../../features/record/types"

export function Traits({ record }: ITraits) {
  const traits = record.tags.filter(t => t.markers.includes("trait"))

  if (!traits || traits.length === 0) {
    return null
  }

  const traitsItems = traits.map((t): IListItem => {
    return {
      mood: "positive",
      content: (
        <>
          <p className="text-xl text-white">{t.title}</p>
          <p className="text-lg">{t.description}</p>
        </>
      ),
    }
  })

  return (
    <Section title="Traits" className="mt-10">
      <List className="mt-5" items={traitsItems} />
    </Section>
  )
}

interface ITraits {
  record: TRecord
}
