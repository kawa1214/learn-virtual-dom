import { elementAttribute } from '../types/index'

const renderElem = (vNode: elementAttribute) => {
  // create the element
  //   e.g. <div></div>
  const $el = document.createElement(vNode.tagName);

  // add all attributs as specified in vNode.attrs
  //   e.g. <div id="app"></div>
  for (const [k, v] of Object.entries(vNode.attrs)) {
    $el.setAttribute(k, v);
  }

  // append all children as specified in vNode.children
  //   e.g. <div id="app"><img></div>
  for (const child of vNode.children) {
    $el.appendChild(render(child));
  }

  return $el;
};

export const render = (vNode: elementAttribute | string) => {
  if (typeof vNode === 'string') {
    return document.createTextNode(vNode);
  }

  return renderElem(vNode);
};

export const firstRender = (vNode: elementAttribute) => {
  return renderElem(vNode);
};