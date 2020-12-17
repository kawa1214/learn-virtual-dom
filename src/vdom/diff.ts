import { render } from './render';
import { elementAttribute, elementAttrs, elementChildren } from '../types/index'
import { createElement } from './createElement';

const replaceChildren = (oldVTree: elementAttribute, newVTree: elementAttribute, $rootEl: Element,) => {
  $rootEl = replaceAttrs(oldVTree.attrs, newVTree.attrs, $rootEl);
  newVTree.children.forEach((newVChild, i) => {
    if (oldVTree.children === undefined || newVTree.children === undefined) {
      return $rootEl
    }
    const oldVChild = oldVTree.children[i]
    if (typeof newVChild === 'string' || typeof oldVChild === 'string') {
      if (newVChild !== oldVChild) {
        const $newNode = render(newVTree)
        $rootEl.replaceWith($newNode)
      }
      return $rootEl;
    }
    if ($rootEl.children[i] === undefined) {
      $rootEl.appendChild(render(newVChild))
      return $rootEl
    }
    replaceChildren(newVChild, oldVChild, $rootEl.children[i])
  })
  return $rootEl
}

const replaceAttrs = (oldAttrs: elementAttrs, newAttrs: elementAttrs, $rootEl: Element,) => {
  for (const [k, v] of Object.entries(newAttrs)) {
    if (typeof v === 'function') {
      $rootEl.addEventListener(k, v as EventListener)
    }else {
      $rootEl.setAttribute(k, v)
    }
  }

  for (const k in oldAttrs) {
    if (!(k in newAttrs)) {
      $rootEl.removeAttribute(k)
    }
  }
  return $rootEl
}

export const diff = (oldVTree: elementAttribute , newVTree: elementAttribute, $rootEl: Element) => {
  $rootEl = replaceChildren(oldVTree, newVTree, $rootEl)
  return $rootEl
}