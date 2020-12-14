import { render } from './render';
import { elementAttribute, elementAttrs, elementChildren } from '../types/index'

const replaceChildren = (oldVTree: elementAttribute, newVTree: elementAttribute, $rootEl: Element,) => {
  $rootEl = replaceAttrs(oldVTree.attrs, newVTree.attrs, $rootEl);
  oldVTree.children.forEach((oldVChild, i) => {
    if (oldVTree.children === undefined || newVTree.children === undefined) {
      return $rootEl
    }
    const newVChild = newVTree.children[i]
    if (typeof oldVChild === 'string' || typeof newVChild === 'string') {
      if (oldVChild !== newVChild) {
        const $newNode = render(newVTree);
        $rootEl.replaceWith($newNode);
      }
      return $rootEl;
    }
    if ($rootEl.children[i] === undefined) {
      return $rootEl
    }
    replaceChildren(oldVChild, newVChild, $rootEl.children[i])
  })
  return $rootEl
}

const replaceAttrs = (oldAttrs: elementAttrs, newAttrs: elementAttrs, $rootEl: Element,) => {
  for (const [k, v] of Object.entries(newAttrs)) {
    $rootEl.setAttribute(k, v);
  }

  for (const k in oldAttrs) {
    if (!(k in newAttrs)) {
      $rootEl.removeAttribute(k);
    }
  }
  return $rootEl
}

export const diff = (oldVTree: elementAttribute , newVTree: elementAttribute, $rootEl: Element) => {

  //$rootEl = replaceAttrs(oldVTree, newVTree, $rootEl)
  $rootEl = replaceChildren(oldVTree, newVTree, $rootEl)

  return $rootEl
};