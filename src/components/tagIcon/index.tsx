import * as React from "react"
import {
  FontAwesomeIcon,
  FontAwesomeIconProps,
} from "@fortawesome/react-fontawesome"
import {
  faGlobe,
  faFloppyDiskCircleArrowRight,
  faFloppyDisks,
  faBadgeCheck,
  faBallotCheck,
  faGamepadModern,
  faDialMed,
  faBook,
  faArrowsMaximize,
  faSkull,
  faGear,
} from "@fortawesome/pro-thin-svg-icons"

import { TagJson } from "../../../graphql-types"

const TAG_ICONS = {
  "open-world": faGlobe,
  "quick-save": faFloppyDiskCircleArrowRight,
  "slot-save": faFloppyDisks,
  achievements: faBadgeCheck,
  "choices-matter": faBallotCheck,
  "full-controller-support": faGamepadModern,
  "adjustable-difficulty": faDialMed,
  "story-rich": faBook,
  "multiple-endings": faArrowsMaximize,
  "hardcore-mode": faSkull,
  mods: faGear,
}

export function TagIcon({ tag, ...rest }: ITagIcon) {
  return <FontAwesomeIcon icon={TAG_ICONS[tag.slug]} {...rest} />
}

interface ITagIcon extends Omit<FontAwesomeIconProps, "icon"> {
  tag: Pick<TagJson, "slug">
}
