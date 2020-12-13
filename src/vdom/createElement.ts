import { elementAttribute } from '../types/index'
export const createElement = (props: elementAttribute) => {
  return {
    tagName: props.tagName,
    attrs: props.attrs,
    children: props.children,
  };
};

/*
export const createElement = (tagName: String, { attrs = {}, children = [] } = {}) => {
  return {
    tagName,
    attrs,
    children,
  };
};
 
 */