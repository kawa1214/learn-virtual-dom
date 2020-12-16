import { elementAttribute } from '../types/index'

const renderElem = (vNode: elementAttribute) => {
  const $el = document.createElement(vNode.tagName);

  for (const [k, v] of Object.entries(vNode.attrs)) {
    if (typeof v === 'function') {
      const eventName = k.slice(2) /// oninput to input
      $el.addEventListener(eventName, v as EventListener)
    }else {
      $el.setAttribute(k, v);
    }
  }

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