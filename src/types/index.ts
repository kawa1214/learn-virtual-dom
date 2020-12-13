export interface elementAttribute {
  tagName: keyof HTMLElementTagNameMap,
  attrs: elementAttrs,
  children: elementChildren,
}

export type elementAttrs = { [key: string]: string }

export type elementChildren = Array<elementAttribute | string>