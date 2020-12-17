import { elementAttribute } from '../types/index'
export const createElement = (props: elementAttribute) => {
  return {
    tagName: props.tagName,
    attrs: props.attrs,
    children: props.children,
  }
}