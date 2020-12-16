export interface elementAttribute {
  tagName: keyof HTMLElementTagNameMap,
  attrs: elementAttrs,
  children: elementChildren,
}

export interface setStateInterface {
  actionType: String,
  state: String
}

export type elementAttrs = { [key: string ]: string | EventListener }


export type elementChildren = Array<elementAttribute | string>